const Receta = require('./receta-model');
const Paso = require('./paso-model');
const Multimedia = require('./multimedia-model');
const TipoReceta = require('./tipoReceta-model');
const Usuario = require('./usuario-model');
const Ingrediente = require('./ingrediente-model');
const Utilizado = require('./utilizado-model');
const Unidad = require('./unidad-model');
const Conversion = require('./conversion-model');
const Alumno = require('./alumno-model');
const Administrador = require('./admin-model');
const Favorito = require('./favorito-model');


// 📌 Receta pertenece a Usuario y TipoReceta
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

// 📌 Conversion entre unidades
Conversion.belongsTo(Unidad, { foreignKey: 'idUnidadOrigen', as: 'unidadOrigen' });
Conversion.belongsTo(Unidad, { foreignKey: 'idUnidadDestino', as: 'unidadDestino' });
Unidad.hasMany(Conversion, { foreignKey: 'idUnidadOrigen', as: 'conversionesDesde' });
Unidad.hasMany(Conversion, { foreignKey: 'idUnidadDestino', as: 'conversionesHacia' });

// 📌 Relaciones 1:1 Usuario ↔ Alumno
Usuario.hasOne(Alumno, { foreignKey: 'usuarioId' });
Alumno.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// 📌 Relaciones 1:1 Usuario ↔ Administrador
Usuario.hasOne(Administrador, { foreignKey: 'usuarioId' });
Administrador.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Favorito, { foreignKey: 'idUsuario' });
Favorito.belongsTo(Usuario, { foreignKey: 'idUsuario' });

Receta.hasMany(Favorito, { foreignKey: 'idReceta' });
Favorito.belongsTo(Receta, { foreignKey: 'idReceta' });


module.exports = {
  Receta,
  Paso,
  Multimedia,
  TipoReceta,
  Usuario,
  Ingrediente,
  Utilizado,
  Unidad,
  Conversion,
  Alumno,
  Administrador,
  Favorito
};
