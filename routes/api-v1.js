const { Router } = require('express');
const thingsApi = require('./things-v1');

const api = Router();

api.use('/things', thingsApi);

module.exports = api;
