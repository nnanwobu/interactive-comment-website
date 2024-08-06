/* abstract */ class MessageStore {
  saveMessage(message) {}
  findMessagesForUser(userID) {}
  messagesSize() {}
  findAllMessages() {}
}

class InMemoryMessageStore extends MessageStore {
  constructor() {
    super();
    this.messages = [];
  }

  saveMessage(message) {
    this.messages.push(message);
  }

  findMessagesForUser(userID) {
    return this.messages.filter(
      (message) => message.from === userID || message.to === userID
    );
  }
  messagesSize() {
    return this.messages.length;
  }
  findAllMessages() {
    return [...this.messages];
  }
}

module.exports = {
  InMemoryMessageStore,
};
