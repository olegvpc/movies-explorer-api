const urlRegEx = /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]!$&'()*+,;=]+#?$/i;
const urlValidatorMessage = 'Строка должна содержать ссылку!';
const incorrectAuthDataMessage = 'Неправильные почта или пароль';
const requiredValidationMessage = (name) => `Поле "${name}" обязательно`;

const documentNotFoundErrorMessage = 'Документ не найден';
const userExistErrorMessage = 'Пользователь с таким email уже существует';
const forbiddenErrorMessage = 'Нет прав для совершения данной операции';
const BadRequestErrorMessage = 'Переданы некорректные данные';

const signedOutMessage = 'Вы вышли из приложения';

module.exports = {
  urlRegEx,
  urlValidatorMessage,
  requiredValidationMessage,
};
