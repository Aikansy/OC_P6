// *************************************************************************************** IMPORT(S)

// 2-19 - Importation de JWT
const jwt = require("jsonwebtoken");

// *************************************************************************************** EXPORT(S)

// 2-20 - Exportation de l'authentificateur
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
    res.status(401).json({ error: error | "Unauthenticated request !" });
  }
};
