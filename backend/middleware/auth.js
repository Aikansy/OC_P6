// *************************************************************************************** IMPORT(S)

// Imports the jsonwebtoken package from Node
const jwt = require("jsonwebtoken");

// *********************************************************************************** MIDDLEWARE(S)

// Exports authorization middleware
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid User ID !";
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: error | "Unauthorized request !" });
  }
};
