const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const TipoReceta = sequelize.define('TipoReceta', {
  idTipo: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcion: DataTypes.STRING(100)
}, {
  tableName: 'tiposReceta',
  timestamps: false
});

module.exports = TipoReceta;
