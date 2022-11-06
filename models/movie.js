const mongoose = require('mongoose');
// const { REGEX_URL } = require('../utils/regex-url');
const isURL = require('validator/lib/isURL'); // использование стандартной библиотеки валидации
const { urlValidatorMessage, requiredValidationMessage } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, requiredValidationMessage('country')],
    },
    director: {
      type: String,
      required: [true, requiredValidationMessage('director')],
    },
    duration: {
      type: Number,
      required: [true, requiredValidationMessage('duration')],
    },
    year: {
      type: String,
      required: [true, requiredValidationMessage('year')],
    },
    description: {
      type: String,
      required: [true, requiredValidationMessage('description')],
    },
    image: {
      type: String,
      required: [true, requiredValidationMessage('image')],
      validate: {
        validator: (v) => isURL(v),
        message: urlValidatorMessage,
      },
    },
    trailerLink: {
      type: String,
      required: [true, requiredValidationMessage('trailerLink')],
      validate: {
        validator: (v) => isURL(v),
        message: urlValidatorMessage,
      },
    },
    thumbnail: {
      type: String,
      required: [true, requiredValidationMessage('thumbnail')],
      validate: {
        validator: (v) => isURL(v),
        message: urlValidatorMessage,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, requiredValidationMessage('owner')],
    },
    movieId: {
      type: Number,
      required: [true, requiredValidationMessage('movieId')],
    },
    nameRU: {
      type: String,
      required: [true, requiredValidationMessage('nameRU')],
    },
    nameEN: {
      type: String,
      required: [true, requiredValidationMessage('nameEN')],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
