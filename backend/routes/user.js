const express = require('express');
// Router express
const router = express.Router();

// Limiter pour attaques de force brute
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10
  });

const userCtrl = require('../controllers/user');
// Importation du middleware qui permet de vérifier si le mot de passe entré pour un enregistrement d'utilisateur est assez fort
const passwordCtrl = require('../middleware/password-validator');

// Route pour l'inscription : on vérifie la complexité du mot de passe avant d'executer le controller
router.post('/signup', passwordCtrl, userCtrl.signup);
// Route pour la connexion
router.post('/login', apiLimiter, userCtrl.login);

module.exports = router;