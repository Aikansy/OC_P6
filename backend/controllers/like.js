// *************************************************************************************** IMPORT(S)

// 5-3 - Importation du schema model sauce
const modelSauce = require("../models/Sauce");

// *********************************************************************** CONTROLLER(S) / EXPORT(S)

// 5-4 - Création et exportation de likeDislike
exports.likeDislike = (req, res, next) => {
  modelSauce
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      // LIKE === 1
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        // mise a jour de la base de donnée (operator mnongoDB $inc/$push)
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId },
            }
          )
          .then(() =>
            res
              .status(201)
              .json({ message: "The like was successfully added !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

      // LIKE === 0
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        // mise a jour de la base de donnée (operator mnongoDB $inc/$pull)
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            }
          )
          .then(() =>
            res
              .status(201)
              .json({ message: "The like was successfully removed !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

      // LIKE === -1 (DISLIKE === 1)
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        // mise a jour de la base de donnée (operator mnongoDB $inc/$push)
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId },
            }
          )
          .then(() =>
            res
              .status(201)
              .json({ message: "The dislike was successfully added !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

      // LIKE === 0 (DISLIKE === 0)
      if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        // mise a jour de la base de donnée (operator mnongoDB $inc/$pull)
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            }
          )
          .then(() =>
            res
              .status(201)
              .json({ message: "The dislike was successfully removed !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
