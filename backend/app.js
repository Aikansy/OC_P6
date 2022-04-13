// *************************************************************************************** IMPORT(S)

// Imports the express framework
const express = require("express");
// Imports the mongoose package from Node
const mongoose = require("mongoose");
// Imports helmet package from Node
const helmet = require("helmet");
// Imports path
const path = require("path");
// Imports user router
const userRoutes = require("./routes/user");
// Imports sauce router
const sauceRoutes = require("./routes/sauce");
// Imports and configures the dotenv package from Node
require("dotenv").config();

// ******************************************************************************* APP (APPLICATION)

// Creates express app by calling express() method
const app = express();

// Specifies the MongoDB database used for the app
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB}.t9ezy.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, // .env file protects the username and password for connecting to the database (.env added to .gitignore)
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connection to MongoDB successful"))
  .catch((error) => console.log(error));

// *********************************************************************************** MIDDLEWARE(S)

// Intercepts all requests (.use) with JSON content type and passes their content in req.body
app.use(express.json());
// Allows clients to upload cross-domain content
app.use(helmet.permittedCrossDomainPolicies());

// Intercepts all requests (.use), allows communication between two servers of different origins and prevents the CORS security system from blocking calls
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allows access to the API from any origin
  res.setHeader(
    "Access-Control-Allow-Headers", // Allows the following headers to be added to requests to the API
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods", // Allows the following methods to be added to requests to the API
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// **************************************************************************************** ROUTE(S)

// Registering the image router in the server as a static resource
app.use("/images", express.static(path.join(__dirname, "images")));
// Registering the user router in the server with its endpoint
app.use("/api/auth", userRoutes);
// Registering the sauce router in the server with its endpoint
app.use("/api/sauces", sauceRoutes);

// *************************************************************************************** EXPORT(S)

// Exports app to access it from other files
module.exports = app;
