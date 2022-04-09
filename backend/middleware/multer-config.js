// *************************************************************************************** IMPORT(S)

// 3-1 - Importation de multer
const multer = require("multer");

// **************************************************************************** MULTER CONFIG OBJECT

// 3-3 - Création du dictionnaire MIME_TYPES
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// 3-2 - Création de l'objet de configuration multer avec diskStorage (multer funct)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, fileName + Date.now() + "." + extension);
  },
});

// *************************************************************************************** EXPORT(S)

// 3-4 - Exportation de multer
module.exports = multer({ storage }).single("image");
