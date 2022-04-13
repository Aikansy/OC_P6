// *************************************************************************************** IMPORT(S)

// Imports the data schema model for the sauces
const modelSauce = require("../models/Sauce");

// *********************************************************************************** MIDDLEWARE(S)

// Exports POST type middleware (for like and dislike feature)
exports.likeDislike = (req, res, next) => {
  modelSauce
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      // When a like added
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: 1 }, // $inc (mongoDB operator) increments the filed likes by the specified value
              $push: { usersLiked: req.body.userId }, // $push (mongoDB operator) appends the specified value to the filed usersLiked
            }
          )
          .then(() =>
            res
              .status(201)
              .json({ message: "The like was successfully added !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

      // When a like is removed
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 }, // $inc (mongoDB operator) increments the filed likes by the specified value
              $pull: { usersLiked: req.body.userId }, // $pull (mongoDB operator) removes the specified value to the filed usersLiked
            }
          )
          .then(() =>
            res
              .status(201)
              .json({ message: "The like was successfully removed !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

      // When a dislike is added
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: 1 }, // $inc (mongoDB operator) increments the filed dislikes by the specified value
              $push: { usersDisliked: req.body.userId }, // $push (mongoDB operator) appends the specified value to the filed usersDisliked
            }
          )
          .then(() =>
            res
              .status(201)
              .json({ message: "The dislike was successfully added !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

      // when a dislike is removed
      if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        modelSauce
          .updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 }, // $inc (mongoDB operator) increments the filed dislikes by the specified value
              $pull: { usersDisliked: req.body.userId }, // $pull (mongoDB operator) removes the specified value to the filed usersDisiked
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
