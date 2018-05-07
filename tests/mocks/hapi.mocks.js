const sinon = require('sinon');

const startMethod = async () => {
    return new Promise(resolve => resolve());
};
const startSpy = sinon.spy(startMethod);
const server = {
    start: startSpy
};

const serverMethod = () => {
    return server;
};

const serverSpy = sinon.spy(serverMethod);

exports.server = serverSpy;
exports.start = startSpy;
