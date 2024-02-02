const express = require("express");
const bodyParser = require("body-parser");
const sendData = require("../configs/sendMail");
const Dealership = require("../models/Dealership");
const generateCodeMiddleware = require("../middlewares/generateCode");

const userRoute = express.Router();

userRoute.use(bodyParser.json());

userRoute.post("/code", generateCodeMiddleware, async (req, res) => {
  const { email } = req.body;

  try {
    const dealership = await Dealership.findOne({ emailDealership: email });

    if (!dealership) {
      return res.status(404).json({ error: "No email registered." });
    }

    dealership.codeLogin = req.randomCode;
    await dealership.save();

    await sendData(dealership.emailDealership, `${req.randomCode}`);

    return res.status(200).json({ code: req.randomCode });
  } catch (error) {
    console.error("Error in /code route:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = userRoute;
