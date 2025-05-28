const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Conversion = sequelize.define('Conversion', {
  idConversion: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idUnidadOrigen: DataTypes.INTEGER,
  idUnidadDestino: DataTypes.INTEGER,
  factorConversion: DataTypes.FLOAT
}, {
  tableName: 'conversiones',
  timestamps: false
});

module.exports = Conversion;
