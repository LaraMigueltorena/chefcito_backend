const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chefcito', 'root', 'Home2002', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
