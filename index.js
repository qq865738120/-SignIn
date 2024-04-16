'use strict';

const Hapi = require('@hapi/hapi');
const request = require("request-promise");
// const request = require("request");
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

            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('zzz', body);
                } else {
                    console.log('cccc', body);
                }
            }

            // console.log('ccccc===cc', req.headers.token || req.query.token);
            const opt = options.signinApi(req.headers.token || req.query.token)
            // console.log('===option==', opt.headers.Authorization);
            const res = await request(opt);

            const id = req.headers.id || req.query.id;
            const setup = req.headers.setup || req.query.setup || 9999;
            if (id) {
                const walk = options.initWalkApi(req.headers.token || req.query.token, id, setup)
                try {
                    // request(walk, callback)
                    const walkRes = await request(walk)
                    console.log('===walkRes===', JSON.parse(walkRes));
                } catch (error) {
                    console.log('error==', error);
                }
                
            }

            // request(options.getOptions(req.query.token), callback);
            const result = {
                ...JSON.parse(res),
                data: ""
            }
            console.log('===res===', result);
            return result;
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
