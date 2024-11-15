const { sequelize, DataTypes } = require('../config/db'); // Correcta importación de la conexión

// Definición del modelo de Personaje
const Personaje = sequelize.define('Personaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Incrementa automáticamente
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false, // No se puede dejar vacío
    },
    poder: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se puede dejar vacío
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser nulo, porque no todos los personajes tienen imagen
    }
}, {
    tableName: 'personajes', // Nombre de la tabla en la base de datos
    timestamps: false, // Deshabilita los campos createdAt y updatedAt
});

// Exporta el modelo para usarlo en otras partes del proyecto
module.exports = Personaje;
