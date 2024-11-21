const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST, 
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false, 
    }
);

// Verificación de la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });


module.exports = { sequelize, DataTypes };
