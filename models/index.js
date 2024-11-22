const { sequelize, DataTypes } = require('../config/db'); 
const Personaje = require('./personaje');
const Batalla = require('./batallas');
const Feature = require('./feature');
const FeatureType = require('./featureType');

module.exports = { Personaje, Batalla, Feature, FeatureType, sequelize, DataTypes };
