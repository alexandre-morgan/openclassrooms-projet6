const jwt = require('jsonwebtoken');

// Ce middleware permet de vérifier si une requête effectuée est bien faire par la personne connectée grace au token donné lors de la connexion
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.security_token);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non-authentifiée !'});
    }
};