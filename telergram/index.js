const TelegramApi = require('node-telegram-bot-api');

const { BOT_TOKEN } = process.env;

const botToken = BOT_TOKEN;

const bot = new TelegramApi(botToken, { polling: true });
const {
  saveApprove,
  saveNewChatId,
} = require('./api');

const users = [
  { userChatId: 300123159, firstName: 'Александра', lastName: '' },
  { userChatId: 417643617, firstName: 'Nadezhda', lastName: 'Tkach' },
  { userChatId: 206633135, firstName: 'Oleg', lastName: 'Tkach' },
];

const buttonOption = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Согласен', callback_data: 'Agree' }],
      [{ text: 'Нет возможности', callback_data: 'Disagree' }],
    ],
  }),
};

const sendMessage = (chatID, message, optional) => {
  try {
    const callBack = optional ? buttonOption : undefined;
    return bot.sendMessage(chatID, message, callBack);
  } catch (e) {
    // console.log(e instanceof ReferenceError); // true
    // console.log(e.message);                   // "bot is not defined"
    // console.log(e.name);                      // "ReferenceError"
    // console.log(e.stack);
    return new Error(`проблема с телеграм ботом: ${e.message} - ${e.name}`);
  }
};

const startTelegramBot = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию о пользователе' },
    { command: '/testnadin', description: 'Тест замена учителя- Nadin' },
    { command: '/testalex', description: 'Тест замена учителя- Alex' },
    { command: '/testoleg', description: 'Тест замена учителя- Oleg' },
  ]);

  bot.on('message', async (msg) => {
    // console.log(msg)
    const text = await msg.text;
    const userChatId = await msg.chat.id;
    const firstName = await msg.from.first_name;
    const lastName = await msg.from.last_name;

    if (text === '/start') {
      await bot.sendSticker(userChatId, 'https://tlgrm.ru/_/stickers/1bf/c0b/1bfc0b94-5bd4-34e3-8b60-588100010d95/7.webp');
      // Информирование модератора о регистрации пользовател
      await saveNewChatId({ chatId: String(userChatId), lastName, firstName })
        // .then((res) => console.log(res))
        .catch((err) => console.log(`Ошибка записи chatId: ${err}`));
    //   await bot.sendMessage(206633135, `зарегистрирован пользователь ${lastName} ${firstName} c chatID: ${userChatId}`);
      await sendMessage(206633135, `зарегистрирован пользователь ${lastName} ${firstName} c chatID: ${userChatId}`);
      return sendMessage(userChatId, 'Добро пожаловать в ЧатБот по сервису поиска замены учителя');
    }
    if (text === '/info') {
      const userData = { userChatId, firstName, lastName };
      if (!(userData in users)) {
        users.push(userData);
      }
      // console.log(users)
      return sendMessage(userChatId, `Тебя зовут ${msg.from.last_name} ${msg.from.first_name}`);
    }
    // if (text === '/testnadin') {
    //   return sendMessage(417643617, 'Нужна замена учителя ФИО на ЗАВТРА', buttonOption);
    //   // await sendMessageForChange(users[1].userChatId);
    // }
    // if (text === '/testalex') {
    //   return sendMessage(300123159, 'Нужна замена учителя ФИО на ЗАВТРА', buttonOption);
    //   // await sendMessageForChange(users[1].userChatId);
    // }
    // if (text === '/testoleg') {
    //   return sendMessage(206633135, 'Нужна замена учителя ФИО на ЗАВТРА', buttonOption);
    //   // await sendMessageForChange(users[1].userChatId);
    // }
    return sendMessage(userChatId, 'Я тебя не понимаю, попробуй еще раз');
    // await bot.sendMessage(cuserChatId, `Ты написал мне ${text}`)
  });

  bot.on('callback_query', async (answer) => {
    const msg = await answer;
    const data = msg.data;
    // console.log(msg.message.chat.id);
    const userChatId = msg.message.chat.id;
    const firstName = msg.message.chat.first_name;
    const lastName = msg.message.chat.last_name;
    if (data === 'Agree') {
    //   console.log(msg.data); // Agree / Disagree
      saveApprove({ chatId: userChatId, status: data });
      return sendMessage(userChatId, `Уважаемая/ый ${firstName} ${lastName}, Вы подтвердили замену учителя`);
    } if (data === 'Disagree') {
    //   console.log(msg.data);
      saveApprove({ chatId: userChatId, status: data });
      return sendMessage(userChatId, `Уважаемая/ый ${firstName} ${lastName}, Вы отказались от замены учителя`);
    }
  });
};

// start();
module.exports = {
  startTelegramBot,
  sendMessage,
};
