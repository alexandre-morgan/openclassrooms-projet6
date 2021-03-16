const Sauce = require('../models/sauce');

const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.likeImplement = (req, res, next) => {
  // Recherche pour trouver la sauce en question
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      let addLikes = sauce.likes;
      let addDislikes = sauce.dislikes;
      let listUsersLiked = sauce.usersLiked;
      let listUsersDisliked = sauce.usersDisliked;

      // Si req.body.like = 1 ET liste des userDisliked ne contient pas le userId
      if (req.body.like === 1 && sauce.usersDisliked.includes(req.body.userId) === false) {
        addLikes++ ;
        listUsersLiked.push(req.body.userId);
      } else if (req.body.like === -1 && sauce.usersLiked.includes(req.body.userId) === false) {
        addDislikes++ ;
        listUsersDisliked.push(req.body.userId);
      } else if (req.body.like === 0) {
        if (sauce.usersLiked.includes(req.body.userId)) {
          addLikes-- ;
          const indexLikes = listUsersLiked.indexOf(req.body.userId)
          listUsersLiked.splice(indexLikes,1);
        } else {
          addDislikes-- ;
          const indexDislikes = listUsersDisliked.indexOf(req.body.userId)
          listUsersDisliked.splice(indexDislikes,1);
        }
      }

      // mise à jour de la sauce
      Sauce.updateOne({ _id: req.params.id }, 
        { sauce, _id: req.params.id, likes: addLikes, dislikes: addDislikes, usersLiked: listUsersLiked, usersDisliked: listUsersDisliked })
        .then(() => res.status(200).json({ message: 'Sauce modifée !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then( sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};