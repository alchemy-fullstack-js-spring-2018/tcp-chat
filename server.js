const chatServer = require('./lib/chat-server');

const PORT = 15678;

chatServer.on('listening', () => {
    console.log('TCP server listening on port', PORT); // eslint-disable-line
});

chatServer.listen(PORT);