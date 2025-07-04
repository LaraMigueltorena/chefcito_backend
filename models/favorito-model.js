const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Favorito = sequelize.define('Favorito', {
  idFavorito: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idReceta: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'favoritos',
  timestamps: false
});

module.exports = Favorito;
