const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db-config');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/recetas', require('./routes/receta-routes'));
app.use('/api/usuarios', require('./routes/usuario-routes'));
app.use('/api/ingredientes', require('./routes/ingrediente-routes'));
app.use('/api/multimedia', require('./routes/multimedia-routes'));
app.use('/api/pasos', require('./routes/paso-routes'));
app.use('/api/tipos-receta', require('./routes/tipoReceta-routes'));
app.use('/api/utilizados', require('./routes/utilizado-routes'));
app.use('/api/unidades', require('./routes/unidad-routes'));
app.use('/api/conversiones', require('./routes/conversion-routes'));
app.use('/api/alumnos', require('./routes/alumno-routes'));
app.use('/api/calificaciones', require('./routes/calificacion-routes'));
app.use('/api/fotos', require('./routes/foto-routes'));
app.use('/api/asistencia-cursos', require('./routes/asistenciaCurso-routes'));
app.use('/api/cronograma-cursos', require('./routes/cronogramaCurso-routes'));
app.use('/api/sedes', require('./routes/sede-routes'));
app.use('/api/cursos', require('./routes/curso-routes'));
app.use('/api/administradores', require('./routes/admin-routes'));






// Test
app.get('/', (req, res) => {
  res.send('¡Backend con Sequelize funcionando!');
});

// Sincronizar modelos y levantar servidor
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conexión a la base de datos exitosa.');

    // Solo sincroniza las tablas ya existentes, no las crea si no existen.
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('🔴 Error al conectar con la base de datos:', err);
  });
  require('./models/associations');

