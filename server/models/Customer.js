const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const boxSchema = require('./Box');

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
  boxes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Box',
    }
  ]
  
});



// set up pre-save middleware to create password
customerSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
customerSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Customer = model('Customer', customerSchema);

module.exports = Customer;
