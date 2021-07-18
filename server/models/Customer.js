const { Schema, model } = require('mongoose');


// to be expanded

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  address: {
    type: String,
    required: true,
    unique: false,
  },
  city: {
    type: String,
    required: true,
    unique: false,
  },
  state: {
    type: String,
    required: true,
    unique: false,
  },
  zip: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: String,
    required: true,
    unique: false,
  },
  
});

const Customer = model('Customer', customerSchema);

module.exports = Customer;
