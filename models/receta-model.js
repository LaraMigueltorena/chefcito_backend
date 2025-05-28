const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Receta = sequelize.define('Receta', {
  idReceta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idUsuario: {
    type: DataTypes.INTEGER
  },
  nombreReceta: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcionReceta: {
    type: DataTypes.TEXT
  },
  fotoPrincipal: {
    type: DataTypes.TEXT
  },
  porciones: {
    type: DataTypes.INTEGER
  },
  cantidadPersonas: {
    type: DataTypes.INTEGER
  },
  idTipo: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'recetas',
  timestamps: false
});

module.exports = Receta;
