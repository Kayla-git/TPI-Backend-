const { sequelize, DataTypes } = require('../config/db');

const Personaje = sequelize.define('Personaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    universo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    habilidades: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'personajes',
    timestamps: false,
});

module.exports = Personaje;
