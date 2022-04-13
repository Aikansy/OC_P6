// *************************************************************************************** IMPORT(S)

// Imports the mongoose package from Node
const mongoose = require("mongoose");

// ********************************************************************************* SCHEMA MODEL(S)

// Creates a data schema model for the sauces with .Schema() method from mongoose
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

// Exports the data schema model for the sauces with .model() method from mongoose to access it from other files
module.exports = mongoose.model("Sauce", sauceSchema);
