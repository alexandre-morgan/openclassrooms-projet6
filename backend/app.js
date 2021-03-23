const express = require('express');
const bodyParser = require('body-parser');

// Pour utiliser une base de données
const mongoose = require('mongoose');

const path = require('path');

// packages liés à la SECURITE
  // Setup headers
const helmet = require('helmet'); 
  // Traiter les données pour éviter les injections SQL
const sanitizer = require('express-html-sanitizer');
const sanitizeReqBody = sanitizer();
// Sécurisation des cookies
const session = require('cookie-session');

// Configuration du fichier contenant les variables sensibles pour les accès et ainsi les cacher du code
require('dotenv').config();

const saucesRoutes = require('./routes/sauce');

const userRoutes = require('./routes/user');

// Connexion à la BDD mongoDB
mongoose.connect(process.env.mongoDB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Header d'authorisation pour tous les utilisateurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

// Sécurisation des cookies pour éviter le piratage de session
const expiryDate = new Date(Date.now() + 60 *60 * 1000);
app.use(session({
  name: 'session',
  secret: process.env.security_cookie,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

// Pré-traitement de la requêtes
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Traitement de sécurité
app.use(sanitizeReqBody);

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/sauces', saucesRoutes);

app.use('/api/auth', userRoutes);

module.exports = app;