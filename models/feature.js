const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;  

const Feature = sequelize.define('Feature', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Para que sea auto incrementable
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    // Despues podemos agregar mas :D
}, {
    tableName: 'features',  // Especificamos el nombre de la tabla en la base de datos
    timestamps: false  
});

// podemos agregar relaciones con otros modelos porsi 

module.exports = Feature;
