// models/estadoCurso-model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const EstadoCurso = sequelize.define('EstadoCurso', {
  idEstadoCurso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idAlumno: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idCronograma: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'estadoCursos',
  timestamps: false,
});

module.exports = EstadoCurso;
