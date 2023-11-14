const multer = require("multer");

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({});

// Verifica si un archivo es una imagen según su extensión o tipo MIME
function isImage(file) {
  // Obtén la extensión del archivo
  const fileExtension = file.originalname.split(".").pop();

  // Verifica si la extensión es de una imagen común
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const isImageExtension = imageExtensions.includes(fileExtension.toLowerCase());

  // Verifica si el tipo MIME del archivo es de una imagen
  const isImageMIME = file.mimetype.startsWith("image/");

  return isImageExtension && isImageMIME;
}

// Función para filtrar archivos y solo aceptar imágenes
function fileFilter(req, file, cb) {
  if (isImage(file)) {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error("El archivo no es una imagen válida"), false); // Rechaza el archivo
  }
}

// Configuración de multer con el filtro de archivos
const upload = multer({ storage, fileFilter });

module.exports = upload.single("image");
