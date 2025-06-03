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
  dniFrente: DataTypes.TEXT,
  dniDorso: DataTypes.TEXT,
  nombre: DataTypes.STRING(100),
  cuentaCorriente: DataTypes.FLOAT
}, {
  tableName: 'alumnos',
  timestamps: false
});

// Relación inversa
Alumno.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = Alumno;
