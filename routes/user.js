const express = require('express');
// Router express
const router = express.Router();

const userCtrl = require('../controllers/user');
// Importation du middleware qui permet de vérifier si le mot de passe entré pour un enregistrement d'utilisateur est assez fort
const passwordCtrl = require('../middleware/password-validator');

// Route pour l'inscription : on vérifie la complexité du mot de passe avant d'executer le controller
router.post('/signup', passwordCtrl, userCtrl.signup);
// Route pour la connexion
router.post('/login', userCtrl.login);

module.exports = router;