const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Unidad = sequelize.define('Unidad', {
  idUnidad: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcion: DataTypes.STRING(50)
}, {
  tableName: 'unidades',
  timestamps: false
});

module.exports = Unidad;
