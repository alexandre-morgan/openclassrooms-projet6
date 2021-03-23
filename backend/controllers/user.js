// Importation du modele user de la base de données
const User = require('../models/user');
// Package pour crypter les password des utilisateurs et pour les comparer
const bcrypt = require('bcrypt');
// Package pour la création et la comparaison des tokens d'authentification pour les requêtes
const jwt = require('jsonwebtoken');
// Package de masquage pour l'email de l'utilisateur
const MaskData = require('maskdata');

// Controller permettant de faire l'inscription d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: MaskData.maskEmail2(req.body.email),
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// Controller permettant de vérifier si l'email et le password correspondent à un utilisateur déjà enregistré
exports.login = (req, res, next) => {
    const maskedEmail = MaskData.maskEmail2(req.body.email);
    User.findOne({ email : maskedEmail })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.security_token,
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
