const Chatid = require('../models/chatid');

const { ValidationError } = require('../errors/validation-error');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbiddenError } = require('../errors/forbidden-error');

module.exports.getAllChatId = (req, res, next) => {
  Chatid.find({})
    // .populate(['owner', 'likes'])
    .sort({ createdAt: 'desc' })
    .then((chatIds) => res.send(chatIds))
    .catch(next); //  то же самое что .catch(err => next(err));
};

module.exports.saveNewChatId = (req, res, next) => {
  const chatIdDataData = req.body;
  Chatid.find({ chatId: chatIdDataData.chatId })
    .then((arr) => {
      if (arr.length === 0) {
        Chatid.create(chatIdDataData)
          .then((responseId) => res.status(201).send(responseId))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              const error = new ValidationError(`Переданы некорректные данные при создании ChatID. - ${err.message}`);
              return next(error);
            }
            return next(err);
          });
      } else {
        // console.log(arr);
        return res.send({ message: `такой chatId: ${chatIdDataData.chatId} уже существует` });
      }
    })
    .catch((err) => next(err));
};
