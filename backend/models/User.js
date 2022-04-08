// *************************************************************************************** IMPORT(S)

// 2-3 - Importation de mongoose
const mongoose = require("mongoose");
// 2-5 - Importation du package mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

// ********************************************************************************* SCHEMA MODEL(S)

// 2-4 - Création du schéma model utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 2-6 - Applique le validator au schéma model
userSchema.plugin(uniqueValidator);

// *************************************************************************************** EXPORT(S)

module.exports = mongoose.model("User", userSchema);
