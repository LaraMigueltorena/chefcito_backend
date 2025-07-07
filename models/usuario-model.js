const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mail: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nickname: {
    type: DataTypes.STRING(50)
  },
  habilitado: {
    type: DataTypes.BOOLEAN
  },
  nombre: {
    type: DataTypes.STRING(100)
  },
  direccion: {
    type: DataTypes.TEXT
  },
  avatar: {
    type: DataTypes.TEXT
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  conexion: {
    type: DataTypes.ENUM('internet', 'datos', 'sin'),
    defaultValue: 'internet'
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;

const Receta = require('./receta-model');
Usuario.hasMany(Receta, { foreignKey: 'idUsuario' });
