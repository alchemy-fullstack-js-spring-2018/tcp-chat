module.exports = function parseMessage(message) {
    console.log(message);
    if(!message.startsWith('@')) return null;

    const firstSpaceIndex = message.indexOf(' ');
    const hasText = firstSpaceIndex !== -1 ? true : false;
    const commandArray = message.slice(1, firstSpaceIndex).split(':');

    const messageObject = {
        command: commandArray[0]
    };

    if(commandArray.length > 1) messageObject.argument = commandArray[1];
    if(hasText) messageObject.text = message.slice(firstSpaceIndex + 1);

    return messageObject;
};