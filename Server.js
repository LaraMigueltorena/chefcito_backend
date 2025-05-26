const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Permitir comunicación entre frontend y backend

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lara2004',
    database: 'chefcito',
    multipleStatements: true
});

// Conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err.message);
        return;
    }
    console.log('Conexión a MySQL exitosa.');
});
const tablasSQL = `
CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    mail VARCHAR(100),
    nickname VARCHAR(50),
    habilitado BOOLEAN,
    nombre VARCHAR(100),
    direccion TEXT,
    avatar TEXT
);

CREATE TABLE IF NOT EXISTS tiposReceta (
    idTipo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS recetas (
    idReceta INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    nombreReceta VARCHAR(100),
    descripcionReceta TEXT,
    fotoPrincipal TEXT,
    porciones INT,
    cantidadPersonas INT,
    idTipo INT,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    FOREIGN KEY (idTipo) REFERENCES tiposReceta(idTipo)
);

CREATE TABLE IF NOT EXISTS pasos (
    idPaso INT AUTO_INCREMENT PRIMARY KEY,
    idReceta INT,
    nroPaso INT,
    texto TEXT,
    FOREIGN KEY (idReceta) REFERENCES recetas(idReceta)
);

CREATE TABLE IF NOT EXISTS multimedia (
    idContenido INT AUTO_INCREMENT PRIMARY KEY,
    idPaso INT,
    tipo_contenido VARCHAR(50),
    extension VARCHAR(20),
    urlContenido TEXT,
    FOREIGN KEY (idPaso) REFERENCES pasos(idPaso)
);

CREATE TABLE IF NOT EXISTS ingredientes (
    idIngrediente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS utilizados (
    idUtilizado INT AUTO_INCREMENT PRIMARY KEY,
    idReceta INT,
    idIngrediente INT,
    cantidad FLOAT,
    unidad VARCHAR(50),
    observaciones TEXT,
    FOREIGN KEY (idReceta) REFERENCES recetas(idReceta),
    FOREIGN KEY (idIngrediente) REFERENCES ingredientes(idIngrediente)
);

CREATE TABLE IF NOT EXISTS unidades (
    idUnidad INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS conversiones (
    idConversion INT AUTO_INCREMENT PRIMARY KEY,
    idUnidadOrigen INT,
    idUnidadDestino INT,
    factorConversion FLOAT,
    FOREIGN KEY (idUnidadOrigen) REFERENCES unidades(idUnidad),
    FOREIGN KEY (idUnidadDestino) REFERENCES unidades(idUnidad)
);

CREATE TABLE IF NOT EXISTS calificaciones (
    idCalificacion INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idReceta INT,
    calificacion INT,
    comentarios TEXT,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    FOREIGN KEY (idReceta) REFERENCES recetas(idReceta)
);

CREATE TABLE IF NOT EXISTS fotos (
    idFoto INT AUTO_INCREMENT PRIMARY KEY,
    idReceta INT,
    urlFoto TEXT,
    extension VARCHAR(20),
    FOREIGN KEY (idReceta) REFERENCES recetas(idReceta)
);

CREATE TABLE IF NOT EXISTS alumnos (
    idAlumno INT AUTO_INCREMENT PRIMARY KEY,
    numeroTarjeta VARCHAR(100),
    dniFrente TEXT,
    dniDorso TEXT,
    nombre VARCHAR(100),
    cuentaCorriente FLOAT
);

CREATE TABLE IF NOT EXISTS cursos (
    idCurso INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100),
    contenidos TEXT,
    requerimientos TEXT,
    duracion VARCHAR(50),
    precio FLOAT,
    modalidad VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS sedes (
    idSede INT AUTO_INCREMENT PRIMARY KEY,
    nombreSede VARCHAR(100),
    direccionSede TEXT,
    telefonoSede VARCHAR(50),
    mailSede VARCHAR(100),
    whatsapp VARCHAR(50),
    tipoBonificacion VARCHAR(50),
    bonificacionCursos FLOAT,
    tipoPromocion VARCHAR(50),
    promocionCursos TEXT
);

CREATE TABLE IF NOT EXISTS cronogramaCursos (
    idCronograma INT AUTO_INCREMENT PRIMARY KEY,
    idSede INT,
    idCurso INT,
    fechaInicio DATE,
    fechaFin DATE,
    vacantesDisponibles INT,
    FOREIGN KEY (idSede) REFERENCES sedes(idSede),
    FOREIGN KEY (idCurso) REFERENCES cursos(idCurso)
);

CREATE TABLE IF NOT EXISTS asistenciaCursos (
    idAsistencia INT AUTO_INCREMENT PRIMARY KEY,
    idAlumno INT,
    idCronograma INT,
    fecha DATE,
    FOREIGN KEY (idAlumno) REFERENCES alumnos(idAlumno),
    FOREIGN KEY (idCronograma) REFERENCES cronogramaCursos(idCronograma)
);
`;

connection.query(tablasSQL, (err) => {
    if (err) {
        console.error('Error al crear tablas:', err.message);
        return;
    }
    console.log('✅ Tablas verificadas o creadas correctamente.');
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Backend funcionando correctamente!');
});

// Endpoint de ejemplo (GET todos los datos)
app.get('/api/recetas', (req, res) => {
    const query = 'SELECT * FROM recetas'; // Reemplaza 'recetas' con el nombre de tu tabla
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar datos:', err.message);
            res.status(500).send('Error al consultar datos.');
            return;
        }
        res.json(results);
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
