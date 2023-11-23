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
  images: {
    type: [String],
    default: ["https://cdn-icons-png.flaticon.com/512/4635/4635904.png"], // Valor por defecto, en este caso, un arreglo con una URL de imagen
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  kilometres: {
    type: Number,
    required: true,
  },
  dealershipName: {
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
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  sell: {
    type: Boolean,
    required: true,
    default: false,
  },
  counterVisits: {
    type: Number,
    required: true,
    default: 0,
  },
  condition: {
    type: String,
    required: true,
    default: "new",
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
