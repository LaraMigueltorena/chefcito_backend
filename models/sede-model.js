const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Sede = sequelize.define('Sede', {
  idSede: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombreSede: DataTypes.STRING(100),
  direccionSede: DataTypes.TEXT,
  telefonoSede: DataTypes.STRING(50),
  mailSede: DataTypes.STRING(100),
  whatsapp: DataTypes.STRING(50), 
}, {
  tableName: 'sedes',
  timestamps: false
});

module.exports = Sede;
