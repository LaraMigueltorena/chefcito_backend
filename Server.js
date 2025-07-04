const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db-config');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());

// 👇 Aumentamos el límite del cuerpo del request a 10MB
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Rutas
app.use('/api/favorito', require('./routes/favorito-routes'));
app.use('/api/recetas', require('./routes/receta-routes'));
app.use('/api/usuarios', require('./routes/usuario-routes'));
app.use('/api/ingredientes', require('./routes/ingrediente-routes'));
app.use('/api/multimedia', require('./routes/multimedia-routes'));
app.use('/uploads', express.static('uploads'));
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
app.use('/uploads', express.static('uploads'));

// Test
app.get('/', (req, res) => {
  res.send('¡Backend con Sequelize funcionando!');
});

// Sincronizar modelos y levantar servidor
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conexión a la base de datos exitosa.');
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
