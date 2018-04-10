const assert = require('assert');
const ChatRoom = require('../lib/chat-room');

describe('chat room', () => {

    let chatRoom;
    beforeEach(() => {
        chatRoom = new ChatRoom();
    });

    it('takes a socket, assigns a username, and stores by username', () => {
        const clients = chatRoom.clients;
        const newClient = {};
        const username = chatRoom.add(newClient);
        const added = clients.has(username);
        const clientObject = chatRoom.getClient(username);
        assert.strictEqual(added, true);
        assert.strictEqual(clientObject.username, username);
        assert.strictEqual(clientObject, newClient);
    });
});