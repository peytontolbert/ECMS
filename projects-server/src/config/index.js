module.exports = {
  PORT: 8002,
  DB_URL: "mongodb://127.0.0.1:27017/project",
  APP_SECRET: "CHANGETHIS",
  EXCHANGE_NAME: "PROJECT_SYSTEM",
  MSG_QUEUE_URL: "amqp://localhost",
  USER_SERVICE: "project_service",
  CONTROL_SERVICE: "CONTROL_service",
};