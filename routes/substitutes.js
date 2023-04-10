const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllSubsToday,
  getAllSubsByInteval,
  setApproveSubs,
  saveNewSubs,
} = require('../controllers/substitutes');

const { sendTelMessage } = require('../middlewares/send_message');

router.get('/', getAllSubsToday);

router.post('/interval', getAllSubsByInteval);

router.post('/approve', setApproveSubs);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      teacherSubstitute: Joi.string().min(2).max(50),
      status: Joi.string().min(2).max(50),
      dateSubstitute: Joi.date(),
      teacherIll: Joi.string().min(2).max(50),
      chatId: Joi.string().min(2).max(50),
      comment: Joi.string().min(2).max(50),
    }),
  }),
  sendTelMessage, // Middleware for send message throw telrgramBot
  saveNewSubs,
);

module.exports = router;
