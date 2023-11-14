const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const uploadMiddleware = require("../middleware/uploadMiddleware");

cloudinary.config({
  cloud_name: "dylweuvjp",
  api_key: "353855474687689",
  api_secret: "j_fvWQQFRAC8Q0UNSr7VQVVEiAQ",
});

function uploadImageToCloudinary(imageFile) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageFile.path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
  });
}

router.get("/", async (req, res) => {
  try {
    res.json({
      mensaje: "funciona al get",
    });
  } catch (error) {
    console.error("Error al get", error);
    res.status(500).json({ error: "Error al get" });
  }
});

// Utiliza el middleware de carga de archivos antes de la ruta POST
router.post("/", uploadMiddleware, async (req, res) => {
  try {
    const imageUrl = await uploadImageToCloudinary(req.file);
    console.log(imageUrl);
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Error al cargar la imagen" });
  }
});

module.exports = router;
