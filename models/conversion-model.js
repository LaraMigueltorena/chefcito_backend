const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const Conversion = sequelize.define('Conversion', {
  idConversion: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  idReceta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  factor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  porciones: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'conversiones',
  timestamps: false
});

module.exports = Conversion;
