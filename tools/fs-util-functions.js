const fs = require('fs');
const uniqid = require('uniqid');

exports.getAllThings = function () {
    let data = fs.readFileSync('source.json', (err, store) => {
        if (err) {
            console.log(err);
        }
        else {
            return store;
        }
    });
    return data.toString();
};

exports.postThing = function (body) {
    let data = fs.readFileSync('source.json', (err, store) => {
        if (err) {
            console.log(err);
        }
        else {
            return store;
        }
    });
    data = JSON.parse(data.toString());
    let thing = {
        id: uniqid(),
    };
    for (let key in body) {
        thing[key] = body[key];
    }
    data.push(thing);
    fs.writeFile('source.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    });
    return thing;
};

exports.putThing = function (id, body) {
    let data = fs.readFileSync('source.json', (err, store) => {
        if (err) {
            console.log(err);
        }
        else {
            return store;
        }
    });
    data = JSON.parse(data.toString());
    let thing = data.find((value) => value.id === id);
    if (thing) {
        for (let key in body) {
            thing[key] = body[key];
        }
        fs.writeFile('source.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
};

exports.deleteThing = function (id) {
    let data = fs.readFileSync('source.json', (err, store) => {
        if (err) {
            console.log(err);
        }
        else {
            return store;
        }
    });
    data = JSON.parse(data.toString());
    data = data.filter(function (thing) {
        return thing.id !== id;
    });
    fs.writeFile('source.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
