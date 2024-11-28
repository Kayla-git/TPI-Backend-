const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;  

const Feature = sequelize.define('Feature', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    // Despues podemos agregar mas :D jijijojojejejjuju
}, {
    tableName: 'features',  
    timestamps: false  
});



module.exports = Feature;
