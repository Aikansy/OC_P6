// *************************************************************************************** IMPORT(S)

// Imports the HTTP package from Node
const http = require("http");
// Imports app
const app = require("./app");
// Imports and configures the dotenv package from Node
require("dotenv").config();

// *********************************************************************************** NORMALIZEPORT

// normalizePort returns a valid port, whether supplied as a number or a string
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
app.set("port", port);

// ************************************************************************************ ERRORHANDLER

// errorHandler checks for different errors and handles them appropriately
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

// Creates a server with the http command and the createServer() method (argument: app Function(s) that will be called on each request sent to the server)
const server = http.createServer(app);

// Registering errorHandler in the server
server.on("error", errorHandler);
// Registering a listener on the server with the defined port passed to normalizePort
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// Server waits and listens to the requests sent with listen() method (argument: Port)
server.listen(port);
