const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Calificacion = sequelize.define('Calificacion', {
  idCalificacion: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idUsuario: DataTypes.INTEGER,
  idReceta: DataTypes.INTEGER,
  calificacion: DataTypes.INTEGER,
  comentarios: DataTypes.TEXT
}, {
  tableName: 'calificaciones',
  timestamps: false
});

module.exports = Calificacion;
