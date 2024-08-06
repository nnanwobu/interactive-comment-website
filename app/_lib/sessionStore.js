/* abstract */ class SessionStore {
  findSession(id) {}
  saveSession(id, session) {}
  findAllSessions() {}
  sessionsSize() {}
  sessionIds() {}
  all() {}
}

class InMemorySessionStore extends SessionStore {
  constructor() {
    super();
    this.sessions = new Map();
  }

  findSession(id) {
    return this.sessions.get(Number(id));
  }

  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
  sessionsSize() {
    return this.sessions.size;
  }
  sessionIds() {
    return [...this.sessions.keys()];
  }
  all() {
    return console.log(this.sessions);
  }
}

module.exports = { InMemorySessionStore };
