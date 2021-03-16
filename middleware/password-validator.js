const passwordStrength = require('check-password-strength');


module.exports = (req, res, next) => {
    try {
        const newPassword = req.body.password;
        if (passwordStrength(req.body.password).value !== 'Strong') {
            throw 'Le mot doit contenir au mois 4 caractères, 1 minuscule, 1 majuscule, 1 symbol, 1 nombre minimum';
        } else {
            next();
        } 
    } catch (error) {
        res.status(400).json({ message: 'Mot de passe trop simple' });
    }
    
};