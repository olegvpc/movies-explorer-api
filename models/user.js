const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail'); // использование библиотеки валидации
const bcrypt = require('bcryptjs'); // импортируем bcrypt для Хэширования пароля

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false, // чтобы API не возвращал пароль
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина имени - 2 символа'],
      maxlength: [30, 'Максимальная длина имени - 30 символов'],
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта'));
      }

      return bcrypt.compare(password, user.password)
        // ВАЖНО - .then метода bcrypt.compare
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
