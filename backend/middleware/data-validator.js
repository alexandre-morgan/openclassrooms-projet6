const mongoose = require('mongoose');

const validate = require ('mongoose-validator');

// Middleware pour la validation des données reçues avant la création d'une instance de Sauce

exports.nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Le nom doit être entre {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
      validator: 'isAlphanumeric',
      //passIfEmpty: true,
      message: 'Name should contain alpha-numeric characters only',
    }),
];

exports.manufacturerValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Le nom doit être entre {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
      validator: 'isAlphanumeric',
      //passIfEmpty: true,
      message: 'Name should contain alpha-numeric characters only',
    }),
];

exports.descriptionValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 150],
      message: 'Le nom doit être entre {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
      validator: 'isAlphanumeric',
      //passIfEmpty: true,
      message: 'Name should contain alpha-numeric characters only',
    }),
];

exports.mainPepperValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Le nom doit être entre {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
      validator: 'isAlphanumeric',
      //passIfEmpty: true,
      message: 'Name should contain alpha-numeric characters only',
    }),
];

exports.imageUrlValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 500],
      message: 'Le nom doit être entre {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
      validator: 'isAlphanumeric',
      //passIfEmpty: true,
      message: 'Name should contain alpha-numeric characters only',
    }),
];
