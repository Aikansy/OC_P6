// *************************************************************************************** IMPORT(S)

// 4-3 - Importation de mongoose
const mongoose = require("mongoose");

// ********************************************************************************* SCHEMA MODEL(S)

// 4-5 - Création du schéma model sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

// *************************************************************************************** EXPORT(S)

// 4-4 - Exportation du schéma model sauce
module.exports = mongoose.model("Sauce", sauceSchema);
