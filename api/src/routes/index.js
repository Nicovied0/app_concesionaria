const express = require("express");
const router = express.Router();


const userRoute = require("./user");
const carRoute = require("./car");
const dealershipRoute = require("./dealership")


router.use("/user", userRoute);
router.use("/cars", carRoute);
router.use("/dealership", dealershipRoute)

module.exports = router;
