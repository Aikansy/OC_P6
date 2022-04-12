// *************************************************************************************** IMPORT(S)

// 4-7 - Importation de FireSystem
const fs = require("fs");
// 4-6 - Importation du schema model sauce
const modelSauce = require("../models/Sauce");

// *********************************************************************** CONTROLLER(S) / EXPORT(S)

// 4-8 - Création des routes sauce
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
    .then(() => {
      console.log(sauce);
      res.status(201).json({ message: "The sauce was successfully created !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

// 4-8 - Création des routes sauce
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

// 4-8 - Création des routes sauce
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

// 4-8 - Création des routes sauce
exports.getOneSauce = (req, res, next) => {
  modelSauce
    .findOne({
      _id: req.params.id,
    })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// 4-8 - Création des routes sauce
exports.getAllSauces = (req, res, next) => {
  modelSauce
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
