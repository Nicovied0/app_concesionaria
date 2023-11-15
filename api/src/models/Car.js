const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: { type: String },
  price: {
    type: Number,
    required: true,
  },
  dealershipName: {
    type: String,
    required: true,
  }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
