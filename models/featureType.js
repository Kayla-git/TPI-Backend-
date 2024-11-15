const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const FeatureType = sequelize.define('FeatureType', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = FeatureType;
