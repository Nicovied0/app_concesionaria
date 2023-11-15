const mongoose = require("mongoose");

const dealershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: Number,
    required: true,
  },
  cars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  }]
});

const Dealership = mongoose.model("Dealership", dealershipSchema);

module.exports = Dealership;
