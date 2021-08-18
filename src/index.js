'use strict';

const { HttpsClient, } = require('./HttpsClient');
const { Router,      } = require('./Router');

const app = new Router();

app.get('/forecast', async (request, response) => {
    try {
        const body = await HttpsClient.get(`https://api.darksky.net${request.path}`);

        return response.send(body);
    } catch (error) {
        console.error(error);

        return response.sendError(502);
    }
});

exports.handler = async (event, context, callback) => await app.serve(event, context, callback);
