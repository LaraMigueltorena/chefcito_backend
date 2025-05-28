const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Alumno = sequelize.define('Alumno', {
  idAlumno: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numeroTarjeta: DataTypes.STRING(100),
  dniFrente: DataTypes.TEXT,
  dniDorso: DataTypes.TEXT,
  nombre: DataTypes.STRING(100),
  cuentaCorriente: DataTypes.FLOAT
}, {
  tableName: 'alumnos',
  timestamps: false
});

module.exports = Alumno;
