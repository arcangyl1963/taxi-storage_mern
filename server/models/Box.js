const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BoxSchema = new Schema({
  boxSize: String,
  sendToCustomer: Boolean,
  getFromCustomer: Boolean,
});

const Box = mongoose.model("Box", BoxSchema);

module.exports = Box;
