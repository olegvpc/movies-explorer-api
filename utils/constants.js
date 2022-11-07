const urlRegEx = /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]!$&'()*+,;=]+#?$/i;
const urlValidatorMessage = 'Строка должна содержать ссылку!';
const requiredValidationMessage = (name) => `Поле "${name}" обязательно`;

module.exports = {
  urlRegEx,
  urlValidatorMessage,
  requiredValidationMessage,
};
