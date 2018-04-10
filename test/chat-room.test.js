const assert = require('assert');
const ChatRoom = require('../lib/chat-room');

describe('chat room', () => {
    const newClient = {};
    const newClient2 = {};

    let chatRoom, clients, originalName;
    beforeEach(() => {
        chatRoom = new ChatRoom();
        clients = chatRoom.clients;
        originalName = chatRoom.add(newClient);
    });

    it('takes a socket, assigns a username, and stores the socket by username', () => {
        const added = clients.has(originalName);
        const clientObject = chatRoom.getClient(originalName);
        assert.strictEqual(added, true);
        assert.strictEqual(clientObject.username, originalName);
        assert.strictEqual(clientObject, newClient);
    });

    it('renames a user', () => {
        const newName = 'newName';
        const renamed = chatRoom.rename(originalName, newName);
        const searchInVain = chatRoom.getClient(originalName);
        const clientObject = chatRoom.getClient(newName);
        assert.strictEqual(renamed, true);
        assert.strictEqual(searchInVain, undefined);
        assert.strictEqual(clientObject, newClient);
        assert.strictEqual(clientObject.username, newName);        
    });

    it('will not rename to an existing username', () => {
        const originalName2 = chatRoom.add(newClient2);
        const notAllowed = chatRoom.rename(originalName, originalName2);
        const clientObject = chatRoom.getClient(originalName);
        const clientObject2 = chatRoom.getClient(originalName2);
        assert.strictEqual(notAllowed, false);
        assert.strictEqual(clientObject, newClient);
        assert.strictEqual(clientObject2, newClient2);
    });

    it('can provide an array of all clients', () => {
        const originalName2 = chatRoom.add(newClient2);
        const clientArray = chatRoom.all();
        assert.deepStrictEqual(clientArray, [{ username: originalName }, { username: originalName2 }]);
    });
});