exports.getServerIsAliveRoute = {
    method: 'GET',
    path: '/api/hello',
    handler: async () => {
        return { isAlive: true };
    }
};
