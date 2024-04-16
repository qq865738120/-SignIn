'use strict';

const Hapi = require('@hapi/hapi');
const request = require("request-promise");
const options = require('./jike');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/jike/signIn',
        handler: async (req, h) => {
            options.options.headers.Authorization = 'Bearer ' + req.query.token;
            const res = await request(options.options);
            return res;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();