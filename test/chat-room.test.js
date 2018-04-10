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
        const username = clients.add(newClient);
        const added = clients.has(username);
        const clientObject = clients.get(username);
        assert.strictEqual(added, true);
        assert.strictEqual(clientObject.username, username);
        assert.deepStrictEqual(clientObject, newClient);
    });
});