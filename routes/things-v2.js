const { Router } = require('express');
const JSONStream = require('JSONStream');
const api = Router();
const asyncHandler = require('express-async-handler');
const {
    getAllThings,
    postThing,
    putThing,
    deleteThing
} = require('../tools/db-util-functions');

api.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

api.get('/', (req, res) => { 
    const { limit, page } = req.query;
    getAllThings(limit, page).cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'));
});

api.post('/', asyncHandler(async (req, res) => {
    if (!req.body.name) {
        return res.sendStatus(400);
    }
    await postThing(req.body);
    res.sendStatus(201);
}));

api.put('/:id', asyncHandler(async (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    await putThing(req.params.id, req.body);
    res.sendStatus(200);
}));

api.delete('/:id', asyncHandler(async (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    await deleteThing(req.params.id);
    res.sendStatus(200);
}));

module.exports = api;
