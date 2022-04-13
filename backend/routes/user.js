// *************************************************************************************** IMPORT(S)

// Imports the express framework
const express = require("express");
// Imports express router with .Router() method from express
const router = express.Router();
// Imports user controllers
const userController = require("../controllers/user");

// **************************************************************************************** ROUTE(S)

// Intercept POST requests with their respective endpoints and redirect to the appropriate controllers
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// *************************************************************************************** EXPORT(S)

// Exports the user router to access it from other files
module.exports = router;
