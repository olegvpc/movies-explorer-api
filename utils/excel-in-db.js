const XLSX = require('xlsx');

const { URL } = require('./constants');
// const URL = 'http://localhost:4000';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjZjNjMjI4NGJhYzk0MzBlOGVkODkiLCJpYXQiOjE2ODExODA5MDQsImV4cCI6MTY4Mzc3MjkwNH0.ExCyGU9Zf4821ErxiodsWVZBUGmbtXMXAapnI1w874I"

// const workbook = XLSX.readFile('test.xlsx');
// const sheetNameList = workbook.SheetNames;
// const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
// console.log(xlData[2]);

module.exports.excelInDb = () => {
  const teachersList = [];

  function getDataObject(number) {
    return new Date((Number(number) - (25567 + 2)) * 86400 * 1000);
  }
  for (let i = 0; i < 109; i++) {
    const user = {};
    const dateEmpty = new Date('2000-01-01');
    user.lastName = xlData[i]['Фамилия'];
    user.firstName = xlData[i]['Имя'];
    user.familyName = xlData[i]['Отчество'] ? xlData[i]['Отчество'] : 'без отчества';
    user.subject = xlData[i]['Должность'];
    user.phone = String(xlData[i]['Телефон']);
    user.email = xlData[i]['E-Mail'];
    user.birthday = xlData[i]['Дата рождения'] ? getDataObject(xlData[i]['Дата рождения']) : dateEmpty;
    user.dateCriminalRecord = xlData[i]['Справка о несудимости'] ? getDataObject(xlData[i]['Справка о несудимости']) : dateEmpty;
    user.education = xlData[i]['Образование'] ? xlData[i]['Образование'] : 'нет данных';
    user.category = xlData[i]['Категория'] ? xlData[i]['Категория'] : '-';
    user.dateAttestat = xlData[i]['Дата аттестации'] ? getDataObject(xlData[i]['Дата аттестации']) : dateEmpty;
    user.dateWork = (xlData[i]['Дата приема на работу'] && getDataObject(xlData[i]['Дата приема на работу']) === 'Invalid Date') ? getDataObject(xlData[i]['Дата приема на работу']) : dateEmpty;
    user.chatId = 'нет данных';
    teachersList.push(user);
  }
  // console.log(teachersList)

  for (let i = 0; i < teachersList.length; i++) {
    // if(i === 27) {
    //   console.log(teachersList[i])
    // }
    try {
      saveTeacher(teachersList[i])
        // .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  }

  function getResponse(res) {
    return res.ok ? res.json() : res.json()
      .then((err) => Promise.reject({message: err.message, status: res.status}))
  }

  // Сохраненение данных учителя
  function saveTeacher(teacher) {
    return fetch(`${URL}/teachers`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacher),
    })
      .then((res) => getResponse(res));
  }
};
