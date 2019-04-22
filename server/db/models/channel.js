const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('channel', {
  name: Sequelize.STRING,
  isDM: Sequelize.BOOLEAN,
  userOne: Sequelize.INTEGER,
  userTwo: Sequelize.INTEGER,
});