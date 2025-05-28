const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Utilizado = sequelize.define('Utilizado', {
  idUtilizado: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idReceta: DataTypes.INTEGER,
  idIngrediente: DataTypes.INTEGER,
  cantidad: DataTypes.FLOAT,
  unidad: DataTypes.STRING(50),
  observaciones: DataTypes.TEXT
}, {
  tableName: 'utilizados',
  timestamps: false
});

module.exports = Utilizado;
