module.exports = class ChatRoom {
    constructor() {
        this.clients = new Map();
    }

    add(client) {
        const username = `user${this.clients.size + 1}`;
        client.username = username;
        this.clients.set(username, client);
        return username;
    }

    getClient(username) {
        return this.clients.get(username);
    }

    rename(username, newUsername) {

    }

    all() {

    }
};