module.exports = class ChatRoom {
    constructor() {
        this.clients = new Map();
    }

    add(client) {
        let username = `user${this.clients.size + 1}`;
        let n = 1;
        while(this.clients.has(username)) {
            username = `user${n}`;
            n++;
        }
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
        return [...this.clients.values()];
    }
};