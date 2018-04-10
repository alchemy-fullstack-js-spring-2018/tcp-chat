const assert = require('assert');
const ChatRoom = require('../lib/chat-room');

describe('chat room', () => {
    const newClient = {};

    let chatRoom, clients, username;
    beforeEach(() => {
        chatRoom = new ChatRoom();
        clients = chatRoom.clients;
        username = chatRoom.add(newClient);
    });

    it('takes a socket, assigns a username, and stores by username', () => {
        const added = clients.has(username);
        const clientObject = chatRoom.getClient(username);
        assert.strictEqual(added, true);
        assert.strictEqual(clientObject.username, username);
        assert.strictEqual(clientObject, newClient);
    });
});