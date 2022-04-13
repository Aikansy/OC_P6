// *************************************************************************************** IMPORT(S)

// Imports the express framework
const express = require("express");
// Imports express router with .Router() method from express
const router = express.Router();
// Imports multer
const multer = require("../middleware/multer-config");
// Imports auth
const auth = require("../middleware/auth");
// Imports sauce controllers
const sauceController = require("../controllers/sauce");
// Imports like/dislike controllers
const likeController = require("../controllers/like");

// **************************************************************************************** ROUTE(S)

// Intercept typed requests with their respective endpoints, applie the authentication function (and multer) and redirect to the appropriate controllers
router.post("/", auth, multer, sauceController.createSauce);
router.put("/:id", auth, multer, sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.get("/", auth, sauceController.getAllSauces);
router.post("/:id/like", auth, likeController.likeDislike);

// *************************************************************************************** EXPORT(S)

// Exports the sauce router to access it from other files
module.exports = router;
