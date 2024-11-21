const { sequelize, DataTypes } = require('../config/db'); 


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
        allowNull: false, 
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser nulo, porque no todos los personajes tienen imagen :,)
    }
}, {
    tableName: 'personajes', // Nombre de la tabla en la base de datos
    timestamps: false, 
});


module.exports = Personaje;
