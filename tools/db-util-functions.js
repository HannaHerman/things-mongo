const Things = require('../models/things-db');

exports.getAllThings = function (limit, page) {
    const thingsLimit = limit ? Number(limit) : 10;
    const thingsPage = page ? Number(page) : 1;
    if (thingsPage <= 0) {
        thingsPage = 1;
    }
    return Things.find({ _deletedAt: null })
        .limit(thingsLimit)
        .skip(thingsLimit * (thingsPage - 1));
};

exports.postThing = async function (body) {
    const anyFields = { ...body };
    const name = body.name;
    delete anyFields.name;
    const thing = new Things({ name, anyFields });
    return await thing.save();
};

exports.putThing = async function (id, body) {
    const valuesToUpdate = { ...body };
    delete valuesToUpdate.name;
    const name = body.name;
    const anyFields = Object.keys(valuesToUpdate).reduce((acc, val) => {
        if (valuesToUpdate[val]) {
            acc[val] = valuesToUpdate[val];
        }
        return acc;
    }, {});
    return await Things.updateOne({ _id: id }, { name, anyFields });
};

exports.deleteThing = async function (id) {
    return await Things.updateOne({ _id: id }, { _deletedAt: Date.now()});
};
