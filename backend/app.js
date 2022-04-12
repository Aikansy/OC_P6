// *************************************************************************************** IMPORT(S)

// 1-4 - Importation du package EXPRESS avec require (method)
const express = require("express");
// 1-13 - Importation de mongoose
const mongoose = require("mongoose");
// 5-1 - Importation de helmet
const helmet = require("helmet");
// 4-9 - Importation de path
const path = require("path");
// 1-14 - Importation de dotenv
const dotenv = require("dotenv");
dotenv.config();
// 1-5 - Appel de EXPRESS pour créer l'application app express
const app = express();

// ******************************************************************************* APP (APPLICATION)

// 1-13 - Importation de mongoose (avec dotenv pour protéger l'ID et Mot de passe)
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PWD}@piiquante.t9ezy.mongodb.net/piiquante?retryWrites=true&w=majority`, // 1-14-A - Modification ID & PASSWORD with dotenv
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connection to MongoDB successful"))
  .catch((error) => console.log(error));

// *********************************************************************************** MIDDLEWARE(S)

// 2-1 - Analyse du corp de la requête
app.use(express.json());

// 5-2 - Application de helmet (permittedCrossDomain)
app.use(helmet.permittedCrossDomainPolicies());

// 2-2 - Ajout du middleware de traitement de tout type de requête (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// **************************************************************************************** ROUTE(S)

// 2-16 - Importation du router user.js
const userRoutes = require("./routes/user");
// 3-10 - Importation du router sauce
const sauceRoutes = require("./routes/sauce");

// 4-10 - Ajout du gestionnaire de routage image (ressource statique)
app.use("/images", express.static(path.join(__dirname, "images")));
// 2-17 - Enregistrement des routes user
app.use("/api/auth", userRoutes);
// 3-11 - Enregistrement des routes sauce
app.use("/api/sauces", sauceRoutes);

// *************************************************************************************** EXPORT(S)

// 1-6 - Exportation de l'application APP pour y avoir accès ailleurs
module.exports = app;
