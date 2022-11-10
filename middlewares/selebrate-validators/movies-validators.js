const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL'); // использование стандартной библиотеки валидации
const { urlValidatorMessage } = require('../../utils/constants');

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image:
      Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(urlValidatorMessage);
        }),
    trailerLink:
      Joi.string()
        .required()
        // .pattern(urlRegEx),
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(urlValidatorMessage);
        }),
    thumbnail:
      Joi.string()
        .required()
        // .pattern(urlRegEx),
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(urlValidatorMessage);
        }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().hex().length(24),
  }),
});

module.exports = {
  createMovieValidator,
  deleteMovieValidator,
};
