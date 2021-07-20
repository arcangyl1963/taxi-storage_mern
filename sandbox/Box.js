const { Schema } = require("mongoose");


// to be expanded

const BoxSchema = new Schema({
  boxSize: {
    type: String,
  },
  sendToCustomer: {
    type: Boolean,
  },
  getFromCustomer: {
    type: Boolean,
  }
});




// const Box = model("Boxes", BoxSchema);

module.exports = BoxSchema;
