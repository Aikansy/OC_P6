// ******************************************************************************* IMPORT PACKAGE(S)

// 1-4 - Importation du package EXPRESS avec require (method)
const express = require("express");
// 1-13 - Importation de mongoose
const mongoose = require("mongoose");
// 1-14 - Importation de dotenv
const dotenv = require("dotenv");
dotenv.config();

// ******************************************************************************* APP (APPLICATION)

// 1-5 - Appel de EXPRESS pour créer l'application app express
const app = express();

// 1-13 - Importation de mongoose (avec dotenv pour protéger l'ID et Mot de passe)
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PWD}@piiquante.t9ezy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, // 1-14-A - Modification ID & PASSWORD with dotenv
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connection to MongoDB successful"))
  .catch(() => console.log("Connection to MongoDB failed"));

// **************************************************************************************** ROUTE(S)

// ********************************************************************************** EXPORTATION(S)

// 1-6 - Exportation de l'application APP pour y avoir accès ailleurs
module.exports = app;
