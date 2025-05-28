const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Paso = sequelize.define('Paso', {
  idPaso: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idReceta: { type: DataTypes.INTEGER },
  nroPaso: DataTypes.INTEGER,
  texto: DataTypes.TEXT
}, {
  tableName: 'pasos',
  timestamps: false
});

module.exports = Paso;
