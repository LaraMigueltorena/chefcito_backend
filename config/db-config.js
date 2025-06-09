const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('chefcito', 'root', 'Bartolo2002', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
