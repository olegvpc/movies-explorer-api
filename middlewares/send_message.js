const { sendMessage } = require('../telergram/index');

// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.sendTelMessage = (req, res, next) => {
  try {
    const { dateSubstitute } = req.body; // Date Object
    const { chatId } = req.body;
    const { teacherIll } = req.body;
    const { comment } = req.body;
    // console.log(req.body, typeof dateString);
    sendMessage(chatId, `Нужна замена учителя ${teacherIll} на ${dateSubstitute.toISOString().substring(0, 10)} - ${comment}`, true);
  } catch (e) {
    console.log(e);
    return next(e);
  }
  return next(); // пропускаем запрос дальше
};
