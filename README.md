# movies-explorer-api
Репозиторий дипломного проекта `Movie`, включающий фронтенд 
и бэкенд части приложения со следующими возможностями: авторизации 
и регистрации пользователей, операции с карточками и пользователями. 
Бэкенд расположен в репозитории ` movies-explorer-api
/`. 

Проект включает регистрацию ВМ в ЯндексОблаке с привязкой доменого имени 
с  публичным IP и выпуск SSL сертификата



# Frontend приложения:
https://olegvpc.diplom.nomoredomains.icu

# Backend приложения:
https://api.olegvpc.diplom.nomoredomains.icu

## Публичный ip: 
158.160.39.232
ssh olegvpc-diplom@158.160.39.232

## перед деплоем
* 1- подключить запуск ТелеграммБота (app.js)
* 2- delete comment onst bot = new TelegramApi(botToken, { polling: true }); (index.js)
* 3- change EndPoin on https://api.olegvpc.diplom.nomoredomains.icu' (constats.js)
## After deploy
* 1- npm install
* 2- copy .env to root
* pm2 restart app

