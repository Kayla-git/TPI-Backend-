require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./config/db'); 
const personajesRoutes = require('./routes/personajes'); 
const batallasRoutes = require('./routes/batallas'); 
const usuariosRoutes = require('./routes/usuarios');

app.use(express.json());



app.get('/', (req, res) => {
    res.send('API de Batallas funcionando');
});

// Conectar rutas
app.use('/personajes', personajesRoutes);
app.use('/batallas', batallasRoutes);
app.use('/usuarios', usuariosRoutes);


sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error en la conexión a la base de datos:', error);
    });


sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });
