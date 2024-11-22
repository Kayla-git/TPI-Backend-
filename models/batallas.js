const { sequelize, DataTypes } = require('../config/db');  
const Personaje = require('./personaje');  

const Batalla = sequelize.define('Batalla', {
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fecha_batalla: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    participante1: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    participante2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ganador_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    resultado: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
});


Batalla.belongsTo(Personaje, { foreignKey: 'participante1' });
Batalla.belongsTo(Personaje, { foreignKey: 'participante2' });
Batalla.belongsTo(Personaje, { foreignKey: 'ganador_id' });  

module.exports = Batalla;
