const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Foto = sequelize.define('Foto', {
  idFoto: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idReceta: DataTypes.INTEGER,
  urlFoto: DataTypes.TEXT,
  extension: DataTypes.STRING(20)
}, {
  tableName: 'fotos',
  timestamps: false
});

module.exports = Foto;
