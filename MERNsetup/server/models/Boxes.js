const { Schema, model } = require('mongoose');


// to be expanded

const BoxesSchema = new Schema({
  boxSize: {
    type: Number
  },
});

const Boxes = model('Boxes', BoxesSchema);

module.exports = Boxes;