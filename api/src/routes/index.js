const express = require("express");
const router = express.Router();


const userRoute = require("./user");
const carRoute = require("./car");


router.use("/user", userRoute);
router.use("/cars", carRoute);

module.exports = router;
