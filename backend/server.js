// ******************************************************************************* IMPORT PACKAGE(S)

// 1-1 - NODE HTML package (require: import command)
const http = require("http");
// 1-8 - Importation de l'application EXPRESS APP
const app = require("./app");
// 1-14 - Importation de dotenv
const dotenv = require("dotenv");
dotenv.config();

// *********************************************************************************** NORMALIZEPORT

// 1-11 - Ajout de normalizePort
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || 3000);

// 1-9 - Définition du port du serveur
app.set("port", port);

// ************************************************************************************ ERRORHANDLER

// 1-12 - Ajout de errorHandler
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// ********************************************************************************** BACKEND SERVER

// 1-2 - Création du serveur avec createServer (method)
const server = http.createServer(app); // 1-8-A - Remplace le paramètre de 1-2 par APP

// 1-12 - Ajout de errorHandler
server.on("error", errorHandler);
// 1-11 - Ajout de normalizePort
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// 1-3 - Lecture des requêtes avec listen (method(port du serveur))
server.listen(port);
