'use strict';

const Hapi = require('@hapi/hapi');
const request = require("request-promise");
// const request = require("request");
const options = require('./jike');

const init = async () => {

    const server = Hapi.server({
        port: 36663,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/jike/signIn',
        handler: async (req, h) => {
            console.log('====token====', req.headers.token || req.query.token);

            const opt = options.signinApi(req.headers.token || req.query.token)
            const res = await request(opt);

            const id = req.headers.id || req.query.id || '1780549096419627010';
            const share = options.docShare(req.headers.token || req.query.token, id)
            request(share)
            // console.log('===shareRes===', JSON.parse(shareRes));

            const article = options.getArticle(req.headers.token || req.query.token, id)
            request(article)
            // console.log('===articleRes===', JSON.parse(articleRes));

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
