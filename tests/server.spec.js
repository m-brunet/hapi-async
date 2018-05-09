const Lab = require('lab');
const mockery = require('mockery');
const sinon = require('sinon');
const Code = require('code');

const lab = exports.lab = Lab.script();

lab.describe('Testing server initialization', () => {
    const stubHapiServer = (registerSpy, startSpy) => {
        return sinon
            .stub(require('hapi'), 'server')
            .returns({
                register: registerSpy,
                start: startSpy,
                info: { uri: '' }
            });
    };

    lab.beforeEach(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerSubstitute('./utils/helpers/log.helpers', './tests/mocks/log.helpers.mocks');
    });

    lab.afterEach(() => {
        mockery.disable();
        mockery.deregisterSubstitute('./utils/helpers/log.helpers');
    });

    lab.test('server method should be called once', () => {
        const serverStub = sinon.stub(require('hapi'), 'server');
        require('../server');

        Code.expect(serverStub.calledOnce).to.be.true();

        serverStub.restore();
    });

    lab.test('should throw error if register method fails', async () => {
        const logMock = require('./mocks/log.helpers.mocks');
        const registerSpy = sinon.stub().throws();
        const startSpy = sinon.stub();
        const serverStub = stubHapiServer(registerSpy, startSpy);

        const server = require('../server');
        await server.startServer();

        Code.expect(registerSpy.calledOnce).to.be.true();
        Code.expect(startSpy.notCalled).to.be.true();
        Code.expect(logMock.info.notCalled).to.be.true();
        Code.expect(logMock.error.calledOnce).to.be.true();

        serverStub.restore();
    });

    lab.test('should throw error if start method fails', async () => {
        const logMock = require('./mocks/log.helpers.mocks');
        const registerSpy = sinon.stub();
        const startSpy = sinon.stub().throws();
        const serverStub = stubHapiServer(registerSpy, startSpy);

        const server = require('../server');
        await server.startServer();

        Code.expect(registerSpy.calledOnce).to.be.true();
        Code.expect(startSpy.calledOnce).to.be.true();
        Code.expect(logMock.info.notCalled).to.be.true();
        Code.expect(logMock.error.calledOnce).to.be.true();

        serverStub.restore();
    });

    lab.test('should call log if no method fails', async () => {
        const logMock = require('./mocks/log.helpers.mocks');
        const registerSpy = sinon.stub();
        const startSpy = sinon.stub();
        const serverStub = stubHapiServer(registerSpy, startSpy);

        const server = require('../server');
        await server.startServer();

        Code.expect(registerSpy.calledOnce).to.be.true();
        Code.expect(startSpy.calledOnce).to.be.true();
        Code.expect(logMock.info.calledOnce).to.be.true();
        Code.expect(logMock.error.notCalled).to.be.true();

        serverStub.restore();
    });
});
