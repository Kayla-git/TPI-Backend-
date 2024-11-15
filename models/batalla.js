const { sequelize, DataTypes } = require('../config/db'); // Importa correctamente ambos

// Definimos el modelo 'Batalla'
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
        allowNull: true, // Puede ser nulo (por ejemplo, si la batalla aún no tiene ganador)
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false, // No puede ser nulo
        defaultValue: DataTypes.NOW, // El valor por defecto es la fecha actual
    }
}, {
    tableName: 'batallas', // El nombre de la tabla en la base de datos
    timestamps: false // No se añaden columnas createdAt y updatedAt
});

// Exportamos el modelo para usarlo en otros archivos
module.exports = Batalla;
