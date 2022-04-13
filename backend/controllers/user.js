// *************************************************************************************** IMPORT(S)

// Imports the bcrypt package from Node
const bcrypt = require("bcrypt");
// Imports the jsonwebtoken package from Node
const jwt = require("jsonwebtoken");
// Imports the data schema model for the users
const modelUser = require("../models/User");

// *********************************************************************************** MIDDLEWARE(S)

// Exports POST type middleware (for signup)
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new modelUser({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Exports POST type middleware (for login)
exports.login = (req, res, next) => {
  modelUser
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Unauthenticated user !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Unauthenticated user !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
