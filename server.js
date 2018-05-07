const Hapi = require('hapi');
const log = require('./utils/helpers/log.helpers');

const server = Hapi.server({
    host: 'localhost',
    port: 3000
});

const startServer = async () => {
    try {
        await server.start();

        log.info(`Server listening on ${server.info.uri}`);
    } catch (err) {
        log.error(err);
    }
};

startServer();
