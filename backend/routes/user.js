// *************************************************************************************** IMPORT(S)

// 2-11 - Importation du package EXPRESS avec require (method) pour créer le router
const express = require("express");
// 2-12 - Création du router avec Router (express method)
const router = express.Router();
// 2-13 - Configuration du router
const userController = require("../controllers/user");

// **************************************************************************************** ROUTE(S)

// 2-14 - Création des deux routes POST (avec signup et login)
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// *************************************************************************************** EXPORT(S)

// 2-15 - Exportation du router
module.exports = router;
