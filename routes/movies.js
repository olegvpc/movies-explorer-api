const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { urlRegEx } = require('../utils/constants');

router.get('/', getAllMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image:
        Joi.string()
          .required()
          .pattern(urlRegEx),
      trailerLink:
        Joi.string()
          .required()
          .pattern(urlRegEx),
      thumbnail:
        Joi.string()
          .required()
          .pattern(urlRegEx),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.number().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
