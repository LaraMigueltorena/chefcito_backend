const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Administrador = sequelize.define('Administrador', {
  idAdmin: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'administradores',
  timestamps: false
});

module.exports = Administrador;
