const Receta = require('./receta-model');
const Paso = require('./paso-model');
const Multimedia = require('./multimedia-model');
const TipoReceta = require('./tipoReceta-model');
const Usuario = require('./usuario-model');
const Ingrediente = require('./ingrediente-model');
const Utilizado = require('./utilizado-model');
const Unidad = require('./unidad-model');
const Conversion = require('./conversion-model');

// 📌 Receta pertenece a Usuario y a TipoReceta
Receta.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Receta.belongsTo(TipoReceta, { foreignKey: 'idTipo' });

// 📌 Paso pertenece a Receta
Paso.belongsTo(Receta, { foreignKey: 'idReceta' });
Receta.hasMany(Paso, { foreignKey: 'idReceta' });

// 📌 Multimedia pertenece a Paso
Multimedia.belongsTo(Paso, { foreignKey: 'idPaso' });
Paso.hasMany(Multimedia, { foreignKey: 'idPaso' });

// 📌 Utilizado pertenece a Receta e Ingrediente
Utilizado.belongsTo(Receta, { foreignKey: 'idReceta' });
Utilizado.belongsTo(Ingrediente, { foreignKey: 'idIngrediente' });

Receta.hasMany(Utilizado, { foreignKey: 'idReceta' });
Ingrediente.hasMany(Utilizado, { foreignKey: 'idIngrediente' });

// 📌 Conversion pertenece a Unidad (origen y destino)
Conversion.belongsTo(Unidad, { foreignKey: 'idUnidadOrigen', as: 'unidadOrigen' });
Conversion.belongsTo(Unidad, { foreignKey: 'idUnidadDestino', as: 'unidadDestino' });

Unidad.hasMany(Conversion, { foreignKey: 'idUnidadOrigen', as: 'conversionesDesde' });
Unidad.hasMany(Conversion, { foreignKey: 'idUnidadDestino', as: 'conversionesHacia' });

module.exports = {
  Receta,
  Paso,
  Multimedia,
  TipoReceta,
  Usuario,
  Ingrediente,
  Utilizado,
  Unidad,
  Conversion
};
