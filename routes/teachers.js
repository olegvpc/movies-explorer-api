const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllTeachers,
  getCurrentTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teachers');

router.get('/', getAllTeachers);

router.get(
  '/:teacherId',
  celebrate({
    params: Joi.object().keys({
      teacherId: Joi.string().alphanum().hex().length(24),
    }),
  }),
  getCurrentTeacher,
);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      lastName: Joi.string().required().min(2).max(50),
      firstName: Joi.string().required().min(2).max(50),
      familyName: Joi.string().required().min(2).max(50),
      subject: Joi.string().required().min(2).max(50),
      phone: Joi.string().required().min(2).max(50),
      email: Joi.string().required().min(2).max(50),
      birthday: Joi.date(),
      dateCriminalRecord: Joi.date(),
      education: Joi.string().min(2).max(50),
      category: Joi.string().min(2).max(50),
      dateAttestat: Joi.date(),
      dateWork: Joi.date(),
      chatId: Joi.string().min(2).max(50),
    }),
  }),
  createTeacher,
);
router.patch(
  '/:teacherId',
  celebrate({
    params: Joi.object().keys({
      teacherId: Joi.string().alphanum().hex().length(24),
    }),
    body: Joi.object().keys({
      lastName: Joi.string().required().min(2).max(50),
      firstName: Joi.string().required().min(2).max(50),
      familyName: Joi.string().required().min(2).max(50),
      subject: Joi.string().required().min(2).max(70),
      phone: Joi.string().required().min(2).max(50),
      email: Joi.string().required().min(2).max(50),
      birthday: Joi.date(),
      dateCriminalRecord: Joi.date(),
      education: Joi.string().min(2).max(50),
      category: Joi.string().min(2).max(50),
      dateAttestat: Joi.date(),
      dateWork: Joi.date(),
      chatId: Joi.string().min(2).max(50),
    }),
  }),
  updateTeacher,
);

router.delete(
  '/:teacherId',
  celebrate({
    params: Joi.object().keys({
      teacherId: Joi.string().alphanum().hex().length(24),
    }),
  }),
  deleteTeacher,
);

module.exports = router;
