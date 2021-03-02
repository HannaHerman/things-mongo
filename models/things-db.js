const { Schema, model, Types } = require('mongoose');

const thingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  _deletedAt: { 
    type: Date,
    default: null
  },
  anyFields: Schema.Types.Mixed
});

const Things = model('things', thingSchema);

module.exports = Things;
