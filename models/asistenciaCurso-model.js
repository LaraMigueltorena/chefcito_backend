const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const AsistenciaCurso = sequelize.define('AsistenciaCurso', {
  idAsistencia: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idAlumno: DataTypes.INTEGER,
  idCronograma: DataTypes.INTEGER,
  fecha: DataTypes.DATEONLY,
  estado: DataTypes.STRING
}, {
  tableName: 'asistenciaCursos',
  timestamps: false
});

module.exports = AsistenciaCurso;
