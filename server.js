const Hapi = require('hapi');

const server = Hapi.server({
    host: 'localhost',
    port: 3000,
});

const startServer = async () => {
    await server.start();
};

startServer();
