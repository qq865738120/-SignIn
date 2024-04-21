'use strict';

const Hapi = require('@hapi/hapi');
const request = require("request-promise");
// const request = require("request");
const options = require('./jike');

const init = async () => {

    const server = Hapi.server({
        port: 3030,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/jike/signIn',
        handler: async (req, h) => {
            const token = req.headers.token || req.query.token
            console.log('====token====', token);

            const opt = options.signinApi(token)
            const res = await request(opt);


            const articleList = options.getArticleList(token)
            const articelListRes = await request(articleList)
            // console.log('====articelListRes==', articelListRes);

            if (articelListRes && JSON.parse(articelListRes) && JSON.parse(articelListRes).data) {
                const list = JSON.parse(articelListRes).data.list;
                const share = options.docShare(token, list[0].id)
                const shareRes = await request(share)
                console.log('===shareRes===', JSON.parse(shareRes), list[0].id);

                const article = options.getArticle(token, list[0].id)
                const articleRes = await request(article)
                // console.log('===articleRes===', JSON.parse(articleRes));
            }

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
