const { Router } = require('express');
const v1Api = require('./api-v1');
const v2Api = require('./api-v2');

const api = Router();

api.use('/v1', v1Api);
api.use('/v2', v2Api);

module.exports = api;
