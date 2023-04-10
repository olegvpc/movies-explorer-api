const { URL } = require('../utils/constants');

function getResponse(res) {
  if (res.ok) {
    return res.json(); // true
  }
  return console.log(res);
}

// Получение всех chatId из DB
const getAllChatId = () => fetch(`${URL}/chatid`, {
  method: 'GET',
  headers: {
    // authorization: `Bearer ${token()}`,
    'Content-Type': 'application/json',
  },
})
  .then((res) => getResponse(res));

// Сохраненение chatId
const saveNewChatId = (chatIdData) => fetch(`${URL}/chatid`, {
  method: 'POST',
  headers: {
    // authorization: `Bearer ${token()}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(chatIdData),
})
  .then((res) => {
  // console.log('ОТВЕТ В api.js -');
    // console.log(chatIdData, URL);
    return getResponse(res);
  })
  .catch((err) => console.log(`ERROR В api.js -${err}`));

  // Сохраненение ответа о замещении
const saveApprove = (approveData) => fetch(`${URL}/substitute/approve`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(approveData),
  })
    .then((res) => {
    // console.log('ОТВЕТ В api.js -');
      // console.log(chatIdData, URL);
      return getResponse(res);
    })
    .catch((err) => console.log(`ERROR В api.js -${err}`));

module.exports = {
  saveNewChatId,
  getAllChatId,
  saveApprove,
};
