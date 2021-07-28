const mongoose = require("mongoose");
const customer = require('./Customer');
const Schema = mongoose.Schema;

const BoxSchema = new Schema({
  boxSize: {
    type:String
  },
  sendToCustomer:{
    type: Boolean
  },
  getFromCustomer: {
    type: Boolean
  },
  customers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    }
  ]
    
});

const Box = mongoose.model("Box", BoxSchema);

module.exports = Box;
