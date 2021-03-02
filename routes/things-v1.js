const { Router } = require('express');
const api = Router();
const {
    getAllThings,
    postThing,
    putThing,
    deleteThing,
} = require('../tools/fs-util-functions');

api.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

api.get('/', (req, res) => {
    const things = getAllThings();
    res.send(things);
});

api.post('/', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(400);
    } else {
        const thing = postThing(req.body);
        res.send(thing);
    }
});

api.put('/:id', function (req, res) {
    putThing(req.params.id, req.body);
    res.sendStatus(200);
});

api.delete('/:id', function (req, res) {
    deleteThing(req.params.id);
    res.sendStatus(200);
});

module.exports = api;
