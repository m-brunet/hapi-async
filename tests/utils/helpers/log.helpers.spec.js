const Lab = require('lab');
const sinon = require('sinon');
const Code = require('code');

const lab = exports.lab = Lab.script();

lab.describe('Testing log helpers', () => {
    lab.test('should call console info method', () => {
        const log = require('../../../utils/helpers/log.helpers');
        sinon.spy(console, 'info');
        log.info('test');

        sinon.assert.calledOnce(console.info);
    });

    lab.test('should call console error method', () => {
        const log = require('../../../utils/helpers/log.helpers');
        const errorStub = sinon.stub(console, 'error');
        log.error('test');

        Code.expect(errorStub.calledOnce).to.be.true();
        // sinon.assert.calledOnce(console.error);
    });
});
