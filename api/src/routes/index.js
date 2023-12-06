const express = require("express");
const router = express.Router();

const userRoute = require("./user");
const carRoute = require("./car");
const dealershipRoute = require("./dealership");
const searchRoute = require("./search");
const filterRoute = require('./filters')
const authRoute = require('./auth')

router.use("/user", userRoute);
router.use("/cars", carRoute);
router.use("/dealership", dealershipRoute);
router.use("/search", searchRoute);
router.use("/filter", filterRoute);
router.use("/auth", authRoute);

module.exports = router;
