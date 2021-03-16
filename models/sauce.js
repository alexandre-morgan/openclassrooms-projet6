const mongoose = require('mongoose');

const validate = require ('mongoose-validator');

const validation = require('../middleware/data-validator');

const sauceSchema = mongoose.Schema({
  //id: { type: String, required: true }, DÉJa créé par la BDD
  userId: { type: String, },
  name: { type: String, required: true, validate: validation.nameValidator },
  manufacturer: { type: String, required: true, validate: validation.manufacturerValidator },
  description: { type: String, required: true, validate: validation.descriptionValidator },
  mainPepper: { type: String, required: true, validate: validation.mainPepperValidator },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [String],
  usersDisliked: [String],
});

module.exports = mongoose.model('Sauce', sauceSchema);