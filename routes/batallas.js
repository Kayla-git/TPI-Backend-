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
    body('personaje1_id').isInt({ min: 1 }).withMessage('El ID del primer personaje debe ser un número mayor a 0'),
    body('personaje2_id').isInt({ min: 1 }).withMessage('El ID del segundo personaje debe ser un número mayor a 0'),
    body('ganador_id').isInt({ min: 1 }).withMessage('El ID del ganador debe ser un número mayor a 0'),
    body('fecha').isISO8601().withMessage('La fecha debe ser válida')
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { personaje1_id, personaje2_id, ganador_id, fecha } = req.body;

    try {
        const batalla = await Batalla.create({
            nombre: 'Batalla épica',  
            participante1: personaje1_id,
            participante2: personaje2_id,
            ganador_id,
            fecha_batalla: fecha
        });
        res.status(201).json(batalla);
    } catch (error) {
        console.error('Detalles del error:', error);  
        res.status(500).json({ error: 'Error al crear la batalla' });
    }
});


module.exports = router;
