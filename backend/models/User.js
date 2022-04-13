// *************************************************************************************** IMPORT(S)

// Imports the mongoose package from Node
const mongoose = require("mongoose");
// Imports the mongoose-unique-validator package
const uniqueValidator = require("mongoose-unique-validator");

// ********************************************************************************* SCHEMA MODEL(S)

// Creates a data schema model for the users with .Schema() method from mongoose
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Applies the mongoose-unique-validator to the data schema model with .plugin() method from mongoose
userSchema.plugin(uniqueValidator);

// *************************************************************************************** EXPORT(S)

// Exports the data schema model for the users with .model() method from mongoose to access it from other files
module.exports = mongoose.model("User", userSchema);
