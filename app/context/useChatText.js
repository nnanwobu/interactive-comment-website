"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../_lib/socket";

const ChatContext = createContext();

function ChatTextProvider({ children, guest }) {
  const [textBox, setTextBox] = useState([]);
  const [users, setUsers] = useState([]);
  const resetChatBox = () => setText([]);
  const { name, email, guestId } = guest;

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    console.log(`old ID is ${sessionID}`);
    if (sessionID) {
      socket.auth = { sessionID, name, email, guestId };
      socket.connect();
    } else if (!sessionID) {
      socket.auth = { name, email, guestId };
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on("user connected", (user) => {
      console.log(`${user.name} connected...`);
      users.map((existingUser) => {
        if (existingUser.userID === user.userID) {
          existingUser.connected = true;
          return;
        } else {
          setUsers([...users, user]);
          return;
        }
      });
      // user.self = user.userId === socket.id;
      // user.messages = [];
    });

    socket.on("user disconnected", (id) => {
      users.map((user) => {
        if (user.userID === id) {
          user.connected = false;
          return;
        }
      });
    });

    socket.on("connect_error", (err) => console.log(err.message));

    socket.on("connect", () => {
      users.map((user) => {
        user.connected = user.self === true;
      });
    });
    socket.on("disconnect", () => {
      users.map((user) => {
        user.connected = user.self === false;
      });
    });

    socket.on("private_message", ({ message, from, to }) => {
      console.log(message);
      users.map((user) => {
        const fromSelf = socket.userID === from;
        if (user.userID === (fromSelf ? to : from)) {
          user.messages.push({
            message,
            fromSelf,
          });
          if (user.userID !== from) {
            user.hasNewMessages = true;
          }
          return;
        }
      });
    });

    socket.on("users", (Users) => {
      Users.forEach((user) => {
        user.messages.forEach((message) => {
          message.fromSelf = message.from === socket.userID;
        });
        for (let i = 0; i < Users.length; i++) {
          const existingUser = Users[i];
          if (existingUser.userID === user.userID) {
            existingUser.connected = user.connected;
            existingUser.messages = user.messages;
            return;
          } else {
            setUsers([user]);
          }
        }
        user.self = user.userID === socket.userID;
      });
      // put the current user first, and sort by username
      users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.name < b.name) return -1;
        return a.name > b.name ? 1 : 0;
      });
    });
    console.log(users);
  }, [users, name, email, guestId]);

  const destroyed = () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("users");
    socket.off("user connected");
    socket.off("user disconnected");
    socket.off("private message");
  };
  destroyed();

  return (
    <ChatContext.Provider
      value={{
        textBox,
        setTextBox,
        resetChatBox,
        users,
        setUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

function useChatBox() {
  const context = useContext(ChatContext);
  if (context === "undefined") throw new Error("hook used outside the scope");
  return context;
}

export { ChatTextProvider, useChatBox };
