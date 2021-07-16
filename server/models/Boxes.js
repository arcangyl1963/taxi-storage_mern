const { Schema, model } = require("mongoose");

// to be expanded

const BoxesSchema = new Schema({
  boxSize: {
    type: Number,
  },

  withCustomer: {
    type: Boolean,
  },
  inStorage: {
    type: Boolean,
  },
  inTransitCustomer: {
    type: Boolean,
  },
  inTransitStorage: {
    type: Boolean,
  },
  customer_id: {
   type: Schema.Types.ObjectId,
   ref: "Customer",
    
  }
});

const Boxes = model("Boxes", BoxesSchema);

module.exports = Boxes;
