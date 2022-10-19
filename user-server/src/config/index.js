const dotEnv = require("dotenv");

module.exports = {
  PORT: 8001,
  DB_URL: "mongodb://127.0.0.1:27017/user",
  APP_SECRET: "pinboards",
  EXCHANGE_NAME: "USER_SYSTEM",
  MSG_QUEUE_URL: "amqp://localhost",
  USER_SERVICE: "user_service",
  CONTROL_SERVICE: "CONTROL_service",
};