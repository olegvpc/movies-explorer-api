const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs'); // импортируем bcrypt для Хэширования пароля
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const { ValidationError } = require('../errors/validation-error');
const { ConflictError } = require('../errors/conflict-error');
const { UnauthorizedError } = require('../errors/unauthorized-error');
const { NotFoundError } = require('../errors/not-found-error');
const { userExistErrorMessage, BadRequestErrorMessage } = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const userId = user._id.toString(); // 633e82dc67dc23be53a4d8a4
      // console.log(userId);
      const token = jwt.sign(
        { _id: userId },
        // 'some-secret-key',
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '30d' },
      );

      // вернём токен в cookie и body
      res.cookie('jwt', token, {
        maxAge: 3600 * 24 * 30,
        httpOnly: true,
      // sameSite: true, //  указать браузеру, чтобы тот посылал куки,
      // только если запрос сделан с того же домена.
      })
        .send({ jwt: token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        const error = new UnauthorizedError(BadRequestErrorMessage);
        return next(error);
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError(BadRequestErrorMessage);
        return next(error);
      }
      if (err.code === 11000) {
        const error = new ConflictError(userExistErrorMessage);
        return next(error);
      }
      // return res.send({ message: 'На сервере произошла ошибкаffffff', CODE: err.message });
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с _id: ${req.user._id} не найден.`);
      } else {
        res.send(user);
      }
    })
    .catch(next); //  то же самое что .catch(err => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  // console.log(req);
  // console.log(req.body); // { email: 'ol1-2@ya.ru', name: 'Oleg-upd-2' }
  // console.log(req.user); // { _id: '6365f4d7fc5c2b661f3988d4', iat: 1667626932,
  // // exp: 1670218932 } - это payload из auth.js
  User.findByIdAndUpdate(
    req.user._id, // 632dd2b94ceb7519db223be0
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с _id: ${req.user._id} не найден.`);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new ValidationError(`Передан некорректный _id: ${req.user._id} пользователя.`);
        return next(error);
      }
      if (err.code === 11000) {
        const error = new ConflictError(userExistErrorMessage);
        return next(error);
      }
      return next(err);
    });
};
