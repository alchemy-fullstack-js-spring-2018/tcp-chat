const assert = require('assert');
const net = require('net');
const chatServer = require('../lib/chat-server');

describe('E2E', () => {
    const PORT = 15678;

    before(done => {
        chatServer.listen(PORT, done);
    });

    let client1 = null;
    before(done => {
        client1 = net.connect(PORT, () => {
            client1.setEncoding('utf8');
            done();
        });
    });
    
    let client2 = null;
    before(done => {
        client2 = net.connect(PORT, () => {
            client2.setEncoding('utf8');
            done();
        });
    });

    after(() => {
        chatServer.close();
    });

    it('welcomes the user', done => {
        client1.once('data', received => {
            assert.equal(received, 'Welcome, user1! Chat with everyone here by beginning your message with "@all" followed by a space.\n');
            done();
        });
    });

    it('broadcasts @all messages to other users', done => {
        client1.once('data', received => {
            assert.equal(received, 'user2 says: Hi!');
            done();
        });

        client2.write('@all Hi!');
    });
    
    it('sends @dm messages to the correct user', done => {
        client1.once('data', received => {
            assert.equal(received, 'You have a direct message! user2 says: I have a secret to tell you.');
            done();
        });

        client2.write('@dm:user1 I have a secret to tell you.');
    });
});