const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;  // Aseguramos que estamos utilizando la conexión correcta

const Feature = sequelize.define('Feature', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Para que sea auto incrementable
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false  // Aseguramos que el nombre no pueda ser nulo
    },
    // Puedes agregar más atributos si es necesario.
}, {
    tableName: 'features',  // Especificamos el nombre de la tabla en la base de datos
    timestamps: false  // Si no necesitas las columnas createdAt/updatedAt
});

// Aquí agregas las relaciones con otros modelos si es necesario
// Ejemplo si "Feature" tiene una relación con "Personaje":
// Feature.belongsTo(Personaje, { foreignKey: 'personaje_id' });

module.exports = Feature;
