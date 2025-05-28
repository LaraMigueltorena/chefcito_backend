const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Multimedia = sequelize.define('Multimedia', {
  idContenido: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idPaso: { type: DataTypes.INTEGER },
  tipo_contenido: DataTypes.STRING(50),
  extension: DataTypes.STRING(20),
  urlContenido: DataTypes.TEXT
}, {
  tableName: 'multimedia',
  timestamps: false
});

module.exports = Multimedia;
