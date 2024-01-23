const express = require("express");
const router = express.Router();

const userRoute = require("./user.routes");
const carRoute = require("./car.routes");
const dealershipRoute = require("./dealership.routes");
const searchRoute = require("./search.routes");
const filterRoute = require("./filters.routes");
const authRoute = require("./auth.routes");
const adminsRoute = require("./admins.routes");

router.use("/user", userRoute);
router.use("/cars", carRoute);
router.use("/dealership", dealershipRoute);
router.use("/search", searchRoute);
router.use("/filter", filterRoute);
router.use("/auth", authRoute);
router.use("/admins", adminsRoute);

module.exports = router;
