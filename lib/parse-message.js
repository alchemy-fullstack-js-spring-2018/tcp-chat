module.exports = function parseMessage(message) {
    if(!message.startsWith('@')) return { command: 'prompt' };

    const firstSpaceIndex = message.indexOf(' ');
    const commandArray = message.slice(1, firstSpaceIndex).split(':');
    const hasText = firstSpaceIndex !== -1 ? true : false;

    const messageObject = {
        command: commandArray[0]
    };

    if(!commandArray[1] && messageObject.command !== 'all' || (commandArray[1] && commandArray[1].match(/\s/))) {
        return { command: 'prompt' };
    } else if(commandArray[1]) messageObject.argument = commandArray[1];

    if(!hasText && messageObject.command !== 'nick' || hasText && messageObject.command === 'nick') {
        return { command: 'prompt' };
    } else if(hasText) messageObject.text = message.slice(firstSpaceIndex + 1);

    return messageObject;
};