const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  //userId: { type: String, required: true }, GENERÉ PAR MONGOOSE
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Permet de créer des utilisateurs avec une adresse email unique
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);