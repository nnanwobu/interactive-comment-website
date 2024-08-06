const { randomUUID } = require("crypto");
const { createServer } = require("http");
const { Server } = require("socket.io");
cors = require("cors");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
  },
});

const { InMemorySessionStore } = require("./app/_lib/sessionStore");
const sessionStore = new InMemorySessionStore();
const { InMemoryMessageStore } = require("./app/_lib/messageStore");
const { Socket } = require("socket.io-client");
const messageStore = new InMemoryMessageStore();

// middleware
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;

  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.name = session.name;
      return next();
    }
  }
  const name = socket.handshake.auth.name;
  if (!name) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = Math.round(Math.random() * 10000);
  socket.userID = Math.round(Math.random() * 10000);
  socket.name = name;
  next();
});

io.on("connection", (socket) => {
  //persist record

  sessionStore.saveSession(socket.sessionID, {
    sessionID: socket.sessionID,
    userID: socket.userID,
    name: socket.name,
    connected: true,
  });

  // send session to the client
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.sessionID);

  //fetch existing users
  const users = [];
  const messagesPerUser = new Map();

  messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    // console.log(`otherUser is ${otherUser}`);

    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  console.log(
    `message here: ${messageStore.findMessagesForUser(socket.userID)}`
  );
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      name: session.name,
      connected: session.connected,
      messages: messagesPerUser.get(session.userID) || [],
    });
  });

  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    // userID: socket.id,
    userID: socket.userID,
    name: socket.name,
    connected: true,
    messages: [],
  });

  // forward the private message to the right recipient (and to other tabs of the sender)

  socket.on("private_message", ({ message, to }) => {
    const content = { message, from: socket.userID, to };
    // console.log(content);

    socket.to(to).to(socket.userID).emit("private_message", content);
    messageStore.saveMessage(content);
    // console.log(messageStore.findAllMessages());
    console.log(messageStore.findMessagesForUser(Socket.userID));
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);

      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        sessionID: socket.sessionID,
        userID: socket.userID,
        name: socket.name,
        connected: false,
      });
    }
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
