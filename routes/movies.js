const router = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/selebrate-validators/movies-validators');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);

router.post(
  '/',
  createMovieValidator,
  createMovie,
);
router.delete(
  '/:movieId',
  deleteMovieValidator,
  deleteMovie,
);

module.exports = router;
