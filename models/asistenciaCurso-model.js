const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const AsistenciaCurso = sequelize.define('AsistenciaCurso', {
  idAsistencia: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idAlumno: DataTypes.INTEGER,
  idCronograma: DataTypes.INTEGER,
  fecha: DataTypes.DATE
}, {
  tableName: 'asistenciaCursos',
  timestamps: false
});

module.exports = AsistenciaCurso;
