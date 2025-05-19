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
    database: 'chefcito'
});

// Conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err.message);
        return;
    }
    console.log('Conexión a MySQL exitosa.');
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
