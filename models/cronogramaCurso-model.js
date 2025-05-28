const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const CronogramaCurso = sequelize.define('CronogramaCurso', {
  idCronograma: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idSede: DataTypes.INTEGER,
  idCurso: DataTypes.INTEGER,
  fechaInicio: DataTypes.DATE,
  fechaFin: DataTypes.DATE,
  vacantesDisponibles: DataTypes.INTEGER
}, {
  tableName: 'cronogramaCursos',
  timestamps: false
});

module.exports = CronogramaCurso;
