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
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  }],
  admins:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});

const Dealership = mongoose.model("Dealership", dealershipSchema);

module.exports = Dealership;
