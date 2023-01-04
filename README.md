# Agreenerator

Приложение генерации дополнительных соглашений

## Используемые технологии

* React
* Redux
* Axios
* NodeJS
* Express
* Sequelize
* Postgres
* Handsontable
* Mailjet

### Сборка

Через лежащий в корне `docker-compose.yml` можно поднять сразу фронт, бэк и базу данных
Для подключения к БД необходимо создать и заполнить файл .env в корне проекта server, в корне проекта client необходимо указать переменную `BACKEND_URL` для Axios.