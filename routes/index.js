const express = require('express');

const { createUserValidator, loginUserValidator } = require('../middlewares/selebrate-validators/users-validators');
const { login, createUser } = require('../controllers/users');
const usersRoute = require('./users');
const moviesRoute = require('./movies');

const teachersRoute = require('./teachers');
const chatIdRoute = require('./chatid');
const substituteRoute = require('./substitutes');

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
routes.use('/chatid', chatIdRoute);
routes.use('/substitute', substituteRoute);

// autorized routes
routes.use(auth);

routes.use('/users', usersRoute);
routes.use('/movies', moviesRoute);
routes.use('/teachers', teachersRoute);


routes.use('*', (req, res, next) => {
  const err = new NotFoundError('Неверный адрес запроса');
  return next(err);
});

module.exports = { routes };
