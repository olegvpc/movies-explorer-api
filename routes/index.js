const express = require('express');

const { createUserValidator, loginUserValidator } = require('../middlewares/selebrate-validators/users-validators');
const { login, createUser } = require('../controllers/users');
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../errors/not-found-error');

const routes = express.Router();

routes.post(
  '/signup',
  createUserValidator,
  createUser,
);

routes.post(
  '/signin',
  loginUserValidator,
  login,
);

// autorized routes
routes.use(auth);

routes.use('/users', usersRoute);
routes.use('/movies', moviesRoute);

routes.use('*', (req, res, next) => {
  const err = new NotFoundError('Неверный адрес запроса');
  return next(err);
});

module.exports = { routes };
