const Lab = require('lab');
const mockery = require('mockery');
const sinon = require('sinon');
const Code = require('code');

const lab = exports.lab = Lab.script();

lab.describe('Testing server initialization', () => {
    lab.beforeEach(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerSubstitute('hapi', './tests/mocks/hapi.mocks');
    });

    lab.afterEach(() => {
        mockery.disable();
        mockery.deregisterSubstitute('hapi');
    });

    lab.test('server method should be called once', () => {
        require('../server');
        const { server } = require('./mocks/hapi.mocks');

        sinon.assert.calledOnce(server);
    });

    lab.test('server method should received proper config parameters', () => {
        require('../server');
        const { server } = require('./mocks/hapi.mocks');
        const serverArg = server.args[0][0];

        // TODO: Import from config file
        Code.expect(serverArg).to.be.an.object();
        Code.expect(serverArg).to.includes({ host: 'localhost' });
        Code.expect(serverArg).to.includes({ port: 3000 });
    });

    lab.test('server method should be called once', () => {
        require('../server');
        const { start } = require('./mocks/hapi.mocks');

        sinon.assert.calledOnce(start);
    });
});
