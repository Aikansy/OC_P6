// *************************************************************************************** IMPORT(S)

// Impots fileSystem from Node
const fs = require("fs");
// Imports the data schema model for the sauces
const modelSauce = require("../models/Sauce");

// *********************************************************************************** MIDDLEWARE(S)

// Exports POST type middleware (for createSauce)
exports.createSauce = (req, res, next) => {
  const sauceData = JSON.parse(req.body.sauce);
  delete req.body._id;

  const sauce = new modelSauce({
    ...sauceData,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() =>
      res.status(201).json({ message: "The sauce was successfully created !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// Exports PUT type middleware (for modifySauce)
exports.modifySauce = (req, res, next) => {
  if (req.file) {
    modelSauce
      .findOne({ _id: req.params.id })
      .then((sauce) => {
        const fileName = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${fileName}`, () => {
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          modelSauce
            .updateOne(
              { _id: req.params.id },
              { ...sauceObject, _id: req.params.id }
            )
            .then(() =>
              res
                .status(200)
                .json({ message: "The sauce was successfully modified !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    const sauceObject = { ...req.body };
    modelSauce
      .updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() =>
        res
          .status(200)
          .json({ message: "The sauce was successfully modified !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

// Exports DELETE type middleware (for deleteSauce)
exports.deleteSauce = (req, res, next) => {
  modelSauce
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        modelSauce
          .deleteOne({ _id: req.params.id })
          .then(() =>
            res
              .status(200)
              .json({ message: "The sauce was successfully deleted !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Exports GET type middleware (for getOneSauce)
exports.getOneSauce = (req, res, next) => {
  modelSauce
    .findOne({
      _id: req.params.id,
    })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Exports GET type middleware (for getAllSauce)
exports.getAllSauces = (req, res, next) => {
  modelSauce
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
