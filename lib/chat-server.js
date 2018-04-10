const net = require('net');
const ChatRoom = require('./chat-room');
const parseMessage = require('./parse-message');

const chatRoom = new ChatRoom();

const chatServer = net.createServer(client => {
    client.setEncoding('utf8');
    chatRoom.add(client);
    client.write(`Welcome, ${client.username}! Chat with everyone here by beginning your message with "@all" followed by a space.\n`);

    client.on('data', data => {
        const messageObject = parseMessage(data);
        respondToMessage(messageObject);
    });

    client.on('close', () => {
        const name = client.username;
        chatRoom.clients.delete(name);
        chatRoom.all().forEach(c => c.write(`${name} has left the chat room.\n`));
    });

    function respondToMessage(message) {
        switch (message.command) {
            case 'all':
                chatRoom.all().forEach(c => c.write(`${client.username} says: ${message.text}`));
                break;
            case 'nick':
                if(chatRoom.rename(client.username, message.argument)) {
                    client.write('Username changed!\n');
                } else {
                    client.write('Sorry, that username is taken.\n');
                }
                break;
            case 'dm':
                if(chatRoom.getClient(message.argument)) {
                    chatRoom.getClient(message.argument).write(`You have a direct message! ${client.username} says: ${message.text}`);
                } else {
                    client.write('No such user exists.\n');
                }
                break;
            case 'prompt':
            default:
                client.write('Not a valid command. Please begin your message with "@all" or "@dm:username" followed by a space or type "@nick:yourNewNickname".\n');
                break;
        }
    }
});

module.exports = chatServer;
