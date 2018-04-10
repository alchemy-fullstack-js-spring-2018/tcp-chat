module.exports = function parseMessage(message) {
    if(!message.startsWith('@')) return null;

    const colonIndex = message.indexOf(':');
    const firstSpaceIndex = message.indexOf(' ');

    return {
        command: message.slice(1, colonIndex),
        argument: message.slice(colonIndex + 1, firstSpaceIndex),
        text: message.slice(firstSpaceIndex + 1)
    };
};