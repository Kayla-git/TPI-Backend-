const { Sequelize } = require('sequelize');
require('dotenv').config();

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

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos (mysql2):', err);
    } else {
        console.log('Conexión a la base de datos (mysql2) establecida');
    }
});

module.exports = { sequelize, connection };
