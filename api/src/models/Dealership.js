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
  emailDealership: {
    type: String,
  },
  description: {
    type: String,
  },
  country: {
    type: String,
    default: "Argentina",
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  userCreatorId: {
    type: String,
    required: true,
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Dealership = mongoose.model("Dealership", dealershipSchema);

module.exports = Dealership;
