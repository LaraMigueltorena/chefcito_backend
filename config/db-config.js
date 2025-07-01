const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('chefcito', 'root', 'Lara2004', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
