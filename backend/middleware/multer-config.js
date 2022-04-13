// *************************************************************************************** IMPORT(S)

// Imports multer from Node
const multer = require("multer");

// **************************************************************************** MULTER CONFIG OBJECT

// Creates the MIME_TYPES dictionary
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

// Creates the multer configuration object with Multer's .diskStorage() method with 2 elements (destination and filename functions)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images"); // (no mistake, defines the destination for saving files)
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.split(" ").join("_"); // Changes the spaces by underscores of the original name with .originalname method from file
    const extension = MIME_TYPES[file.mimetype]; // Attributes the extension of image files with mimetype method from file
    callback(null, fileName + "_" + Date.now() + "." + extension); // // (no mistake, configures the image file names)
  },
});

// *************************************************************************************** EXPORT(S)

// Exports multer with image folder only
module.exports = multer({ storage }).single("image");
