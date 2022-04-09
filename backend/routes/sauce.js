// *************************************************************************************** IMPORT(S)

// 3-5 - Importation du package EXPRESS avec require (method)
const express = require("express");
// 3-6 - Importation du router avec Router (express method)
const router = express.Router();

// 3-7 - Importation de multer
const multer = require("../middleware/multer-config");
// 3-8 - Importation de auth
const auth = require("../middleware/auth");

// **************************************************************************************** ROUTE(S)

// *************************************************************************************** EXPORT(S)

// 3-9 - Exportataion du router
module.exports = router;
