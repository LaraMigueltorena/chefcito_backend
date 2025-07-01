const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Curso = sequelize.define('Curso', {
  idCurso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Nombre: DataTypes.TEXT,
  descripcionBreve: DataTypes.STRING(100),
  descripcionCompleta: DataTypes.TEXT,
  utensillos: DataTypes.TEXT,
  insumos: DataTypes.TEXT,
  dias: DataTypes.TEXT,
  horario: DataTypes.TEXT,
  duracion: DataTypes.STRING(50),
  precio: DataTypes.FLOAT,
  
  modalidad: DataTypes.STRING(50)
}, {
  tableName: 'cursos',
  timestamps: false
});

module.exports = Curso;
