const { sequelize, DataTypes } = require('../config/db'); 

// el modelo 'Batalla'
const Batalla = sequelize.define('Batalla', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Se incrementa automáticamente
    },
    personaje1_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // No puede ser nulo
    },
    personaje2_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // No puede ser nulo
    },
    ganador_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puede ser nulo
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: DataTypes.NOW, // El valor por defecto es la fecha actual
    }
}, {
    tableName: 'batallas', // El nombre de la tabla en la base de datos
    timestamps: false // No se añaden columnas createdAt 
});

// para verlo en otros archivos
module.exports = Batalla;
