const assert = require('assert');
const ChatRoom = require('../lib/chat-room');

describe('chat room', () => {
    const newClient = {};

    let chatRoom, clients, originalName;
    beforeEach(() => {
        chatRoom = new ChatRoom();
        clients = chatRoom.clients;
        originalName = chatRoom.add(newClient);
    });

    it('takes a socket, assigns a username, and stores by username', () => {
        const added = clients.has(originalName);
        const clientObject = chatRoom.getClient(originalName);
        assert.strictEqual(added, true);
        assert.strictEqual(clientObject.username, originalName);
        assert.strictEqual(clientObject, newClient);
    });

    it('renames a user', () => {
        const newName = 'new name';
        const renamed = chatRoom.rename(originalName, newName);
        const searchInVain = chatRoom.getClient(originalName);
        const clientObject = chatRoom.getClient(newName);
        assert.strictEqual(renamed, true);
        assert.strictEqual(searchInVain, undefined);
        assert.strictEqual(clientObject, newClient);
        assert.strictEqual(clientObject.username, newName);        
    });

    it('will not rename to existing user name', () => {
        const newClient2 = {};
        const originalName2 = chatRoom.add(newClient2);
        const notAllowed = chatRoom.rename(originalName, originalName2);
        const clientObject = chatRoom.getClient(originalName);
        const clientObject2 = chatRoom.getClient(originalName2);
        assert.strictEqual(notAllowed, false);
        assert.strictEqual(clientObject, newClient);
        assert.strictEqual(clientObject2, newClient2);
    });
});