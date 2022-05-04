# Coffee Shop API

## Documentation
API documentation can be seen in Swagger UI on http://localhost:8080/api-docs/

The API can be tested directly on that page by clicking on try out
and inputing query parameters.

## .env configuration
.env file should be created in the config folder of the backend directory.

The following are required .env variables and example values
`DB_URL` = `<Mongodb database connection URL>`

`JWT_SECRET` = `6bsstKdmqGbxrqrR`

`JWT_EXPIRE_TIME` = `1d`

`JWT_SECRET_PASS_RESET` = `a7bsbssstKdmqGbxrqrRfgetw`

`JWT_EXPIRE_TIME_PASS_RESET` = `20m`

`COOKIE_EXPIRE` = `1d`

`SMPT_SERVICE` = `gmail`

`SMPT_USER` = `test@gmail.com`

`SMPT_PASSWORD` = `password`

`SMPT_HOST` = `smpt.gmail.com`

`SMPT_PORT` = `465`

## Starting the server

`$ npm i`

`$ npm start`