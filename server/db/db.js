const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/globeChat', {
    logging: false
  }
);
module.exports = db;
