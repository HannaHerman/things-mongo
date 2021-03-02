const { Router } = require('express');
const thingsApi = require('./things-v2');

const api = Router();

api.use('/things', thingsApi);

module.exports = api;
