const { Schema, model } = require('mongoose');


// to be expanded

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

});

const User = model('User', userSchema);

module.exports = User;
