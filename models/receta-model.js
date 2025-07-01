const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config'); // ESTA LÍNEA ES CLAVE

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
  },
  estado: {
    type: DataTypes.ENUM('en espera', 'aprobada', 'rechazada'),
    allowNull: false,
    defaultValue: 'en espera'
  }
}, {
  tableName: 'recetas',
  timestamps: false
});

module.exports = Receta;
