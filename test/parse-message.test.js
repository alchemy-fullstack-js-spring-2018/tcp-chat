const assert = require('assert');
const parseMessage = require('../lib/parse-message');

describe('message parser', () => {
    it('ignores strings that do not start with @', () => {
        const failure = parseMessage('some text without @ at the beginning');
        assert.deepStrictEqual(failure, { command: 'prompt' });
    });

    it('converts a string into a command object', () => {
        const messageObject = parseMessage('@cmd:param some text');
        assert.deepStrictEqual(messageObject, { command: 'cmd', argument: 'param', text: 'some text' });
    });
});