const passwordStrength = require('check-password-strength');

passwordValidator = (req, res, next) => {
    try {
        if (passwordStrength.passwordStrength(req.body.password).id !== 3) {
            throw 'Le mot doit contenir au mois 4 caractères, 1 minuscule, 1 majuscule, 1 symbol, 1 nombre minimum';
        } else {
            next();
        } 
    } catch (error) {
        res.status(400).json({ message: 'Mot de passe trop simple' });
    }
    
};

module.exports = passwordValidator;