const express = require("express");
const router = express.Router();


const uploadImage = require("./uploadFile");


router.use("/uploadImage", uploadImage);

module.exports = router;
