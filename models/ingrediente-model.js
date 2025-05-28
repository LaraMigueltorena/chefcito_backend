const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Ingrediente = sequelize.define('Ingrediente', {
  idIngrediente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'ingredientes',
  timestamps: false
});

module.exports = Ingrediente;
