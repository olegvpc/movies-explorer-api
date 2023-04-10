const URL = 'http://localhost:4000';
const urlValidatorMessage = 'Строка должна содержать ссылку!';
const userExistErrorMessage = 'Пользователь с таким email уже существует';
const BadRequestErrorMessage = 'Переданы некорректные данные';
const requiredValidationMessage = (name) => `Поле "${name}" обязательно`;

module.exports = {
  urlValidatorMessage,
  userExistErrorMessage,
  BadRequestErrorMessage,
  requiredValidationMessage,
  URL,
};
