const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Batalla = require('../models/batallas');


router.get('/', async (req, res) => {
    try {
        const batallas = await Batalla.findAll(); 
        res.json(batallas);
    } catch (error) {
        console.error('Error al obtener las batallas:', error);
        res.status(500).send('Error al obtener las batallas');
    }
});


router.post('/', [
    body('participante1').isInt({ min: 1 }).withMessage('El ID del primer personaje debe ser un número mayor a 0'),
    body('participante2').isInt({ min: 1 }).withMessage('El ID del segundo personaje debe ser un número mayor a 0'),
    body('ganador_id').isInt({ min: 1 }).withMessage('El ID del ganador debe ser un número mayor a 0'),
    body('fecha_batalla').isISO8601().withMessage('La fecha debe ser válida')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { participante1, participante2, ganador_id, fecha_batalla } = req.body;

    try {
        const batalla = await Batalla.create({
            nombre: 'Batalla épica',
            participante1,
            participante2,
            ganador_id,
            fecha_batalla
        });
        res.status(201).json(batalla);
    } catch (error) {
        console.error('Detalles del error:', error);
        res.status(500).json({ error: 'Error al crear la batalla' });
    }
});


module.exports = router;
