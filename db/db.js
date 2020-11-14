require('dotenv').config();

const { Sequelize } = require('sequelize');

const postgresDbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}

const sequelize = new Sequelize(`postgres://${postgresDbConfig.user}:${postgresDbConfig.password}@${postgresDbConfig.host}:${postgresDbConfig.port}/${postgresDbConfig.database}`)

module.exports = sequelize;
