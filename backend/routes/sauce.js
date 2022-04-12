// *************************************************************************************** IMPORT(S)

// 3-5 - Importation du package EXPRESS avec require (method)
const express = require("express");
// 3-6 - Importation du router avec Router (express method)
const router = express.Router();

// 3-7 - Importation de multer
const multer = require("../middleware/multer-config");
// 3-8 - Importation de auth
const auth = require("../middleware/auth");

// 4-1 - Importation de sauceController
const sauceController = require("../controllers/sauce");
// 5-2 - Importation de likeController
const likeController = require("../controllers/like");

// **************************************************************************************** ROUTE(S)

// 4-2 - Création des routes sauce
router.post("/", auth, multer, sauceController.createSauce);
router.put("/:id", auth, multer, sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.get("/", auth, sauceController.getAllSauces);
router.post("/:id/like", auth, likeController.likeDislike); // 5-1 - Ajout de la route post likeDislike

// *************************************************************************************** EXPORT(S)

// 3-9 - Exportataion du router
module.exports = router;
