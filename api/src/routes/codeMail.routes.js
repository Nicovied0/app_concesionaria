const express = require("express");
const bodyParser = require("body-parser");

const sendData = require("../configs/sendMail");
const generarCodigoMiddleware = require("../middlewares/generateCode");

const userRoute = express.Router();

userRoute.use(bodyParser.json());

userRoute.post("/code", generarCodigoMiddleware, sendData);

module.exports = userRoute;
