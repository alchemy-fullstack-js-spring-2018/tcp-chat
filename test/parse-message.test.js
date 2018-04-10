const assert = require('assert');
const parseMessage = require('../lib/parse-message');

describe('message parser', () => {
    const message = '@cmd:param some text';

    it('ignores strings that do not start with @', () => {
        const failure = parseMessage('some text without @ at the beginning');
        assert.strictEqual(failure, null);
    });
});