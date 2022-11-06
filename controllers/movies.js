const Movie = require('../models/movie');

const { ValidationError } = require('../errors/validation-error');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbiddenError } = require('../errors/forbidden-error');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .sort({ createdAt: 'desc' })
    .then((movies) => res.send(movies))
    .catch(next); //  то же самое что .catch(err => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, nameRU, nameEN, movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: ownerId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError(`Переданы некорректные данные при создании карточки фильма. - ${err.message}`);
        return next(error);
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(`Карточка фильма с указанным _id: ${req.params.movieId} не найдена.`);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку фильма');
      }
      Movie.findByIdAndRemove(req.params.movieId)
      // .populate('owner')
        .then(() => {
          res.send({ message: ` Карточка фильма с _id: ${req.params.movieId} удалена` });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError(`Передан некорректный _id: ${req.params.movieId} карточки фильма. ${err.name}`);
        return next(error);
      }
      return next(err);
    });
};
