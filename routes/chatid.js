const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllChatId,
  saveNewChatId,
} = require('../controllers/chatid');

router.get('/', getAllChatId);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      lastName: Joi.string().required().min(2).max(50),
      firstName: Joi.string().required().min(2).max(50),
      chatId: Joi.string().min(2).max(50),
    }),
  }),
  saveNewChatId,
);

module.exports = router;
