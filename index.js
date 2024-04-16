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

            console.log('ccccc===cc', req.headers.token || req.query.token);
            const opt = options.getOptions(req.headers.token || req.query.token)
            console.log('===option==', opt.headers.Authorization);
            const res = await request(opt);
            // request(options.getOptions(req.query.token), callback);
            console.log('===res===', JSON.parse(res));
            return JSON.parse(res);
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



var CryptoJS = require("crypto-js");
let t = 6666 + "_salt";
for (let index = 0; index < 6; index++) {
    t = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t))
}
console.log('=== cccccvvv===', t);
