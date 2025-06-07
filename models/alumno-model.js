const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');
const Usuario = require('./usuario-model');

const Alumno = sequelize.define('Alumno', {
  idAlumno: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  numeroTarjeta: DataTypes.STRING(100),
  codigoSeguridad: DataTypes.STRING(3),
  numeroDeTramite: DataTypes.STRING(100),
  dniFrente: DataTypes.TEXT,
  dniDorso: DataTypes.TEXT,
  nombre: DataTypes.STRING(100),
  apellido: DataTypes.STRING(100),
}, {
  tableName: 'alumnos',
  timestamps: false
});


module.exports = Alumno;
