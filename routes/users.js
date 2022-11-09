const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { updateUserValidator } = require('../middlewares/selebrate-validators/users-validators');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch(
  '/me',
  updateUserValidator,
  updateUser,
);

module.exports = router;
