require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize, connection } = require('./config/db'); // Importamos sequelize y connection desde db.js

app.use(express.json());

// Ruta principal para verificar que la API funciona
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Puerto definido en el archivo .env o 5000 por defecto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Sincronizar la base de datos con Sequelize
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });

// Prueba de conexión con mysql2
connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Error en la consulta:', err);
    } else {
        console.log('Resultado de la consulta:', results[0].solution);
    }
});
