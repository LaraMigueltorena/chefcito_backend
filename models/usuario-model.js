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
    type: DataTypes.STRING(20), // 'alumno' o 'admin'
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
