require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./config/db'); // Ahora solo importamos sequelize
const { Personaje, Batalla, Feature, FeatureType } = require('./models');

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Batallas funcionando');
});

// para todos los personajes
app.get('/personajes', async (req, res) => {
    try {
        const personajes = await Personaje.findAll();
        res.json(personajes);
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
        res.status(500).send('Error al obtener los personajes');
    }
});

// para un personaje por id
app.get('/personajes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const personaje = await Personaje.findByPk(id);
        if (personaje) {
            res.json(personaje);
        } else {
            res.status(404).send('Personaje no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        res.status(500).send('Error al obtener el personaje');
    }
});

// Crear una batalla
app.post('/batallas', async (req, res) => {
    const { personaje1_id, personaje2_id, ganador_id, potenciador1_id, potenciador2_id, atenuante1_id, atenuante2_id } = req.body;

    try {
        const personaje1 = await Personaje.findByPk(personaje1_id);
        const personaje2 = await Personaje.findByPk(personaje2_id);
        
        if (!personaje1 || !personaje2) {
            return res.status(400).send('Ambos personajes deben existir');
        }

        const batalla = await Batalla.create({
            personaje1_id,
            personaje2_id,
            ganador_id,
            fecha: new Date()
        });

        const features = [];
        if (potenciador1_id) {
            features.push({ batalla_id: batalla.id, feature_id: potenciador1_id });
        }
        if (potenciador2_id) {
            features.push({ batalla_id: batalla.id, feature_id: potenciador2_id });
        }
        if (atenuante1_id) {
            features.push({ batalla_id: batalla.id, feature_id: atenuante1_id });
        }
        if (atenuante2_id) {
            features.push({ batalla_id: batalla.id, feature_id: atenuante2_id });
        }

        if (features.length > 0) {
            await Feature.bulkCreate(features);
        }

        res.status(201).json(batalla);
    } catch (error) {
        console.error('Error al crear la batalla:', error);
        res.status(500).send('Error al crear la batalla');
    }
});

// para todas las batallas
app.get('/batallas', async (req, res) => {
    try {
        const batallas = await Batalla.findAll();
        res.json(batallas);
    } catch (error) {
        console.error('Error al obtener las batallas:', error);
        res.status(500).send('Error al obtener las batallas');
    }
});

// Crear un potenciador o atenuante
app.post('/features', async (req, res) => {
    const { nombre, tipo } = req.body;

    try {
        const tipoFeature = await FeatureType.findOne({ where: { tipo } });

        if (!tipoFeature) {
            return res.status(400).send('Tipo de feature no válido');
        }

        const feature = await Feature.create({
            nombre,
            feature_type_id: tipoFeature.id
        });

        res.status(201).json(feature);
    } catch (error) {
        console.error('Error al crear el feature:', error);
        res.status(500).send('Error al crear el feature');
    }
});

// conexión a la base de datos con sequelize.authenticate
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error en la conexión a la base de datos:', error);
    });

// Sincronización de base de datos y servidor
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });
