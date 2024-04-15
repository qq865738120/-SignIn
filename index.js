'use strict';

const Hapi = require('@hapi/hapi');
const request = require("request");
const options = require('./jike');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/jike/signIn',
        handler: (req, h) => {

            const user = {
                firstName: 'John',
                lastName: 'Doe',
                userName: 'JohnDoe',
                id: 123
            }

            // console.log('====',req.query.token);

            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                  console.log(body);
                } else {
                  console.log("===error===");
                  console.log(body);
                }
            }

            options.options.headers.Authorization = 'Bearer ' + req.query.token;
            request(options.options, callback);
            return user;
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