const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',  // Specify the PostgreSQL dialect
  host: 'localhost',
  username: 'postgres',
  password: 'password',
  database: 'creditos',
  port: 5432,
});

module.exports = sequelize;
