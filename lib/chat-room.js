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
        const client = this.clients.get(username);
        if(!this.clients.has(newUsername)) {
            this.clients.delete(username);
            client.username = newUsername;
            this.clients.set(newUsername, client);
            return true;
        } else return false;
    }

    all() {

    }
};