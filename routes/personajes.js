const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Personaje = require('../models/personaje'); 


router.get('/', async (req, res) => {
    try {
        const personajes = await Personaje.findAll();
        res.json(personajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
});


router.post('/', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('universo').notEmpty().withMessage('El universo es obligatorio'),
    body('nivel').isInt({ min: 1 }).withMessage('El nivel debe ser un número mayor a 0'),
    body('habilidades').optional().isString().withMessage('Las habilidades deben ser una cadena de texto'),
    body('fecha_creacion').optional().isISO8601().withMessage('La fecha de creación debe ser una fecha válida'),
], async (req, res) => {
    // Validar los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, universo, nivel, habilidades, fecha_creacion } = req.body;

    try {
        const nuevoPersonaje = await Personaje.create({
            nombre,
            universo,
            nivel,
            habilidades,
            fecha_creacion
        });
        res.status(201).json(nuevoPersonaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el personaje' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params; 
    const { nombre, universo, nivel, habilidades, fecha_creacion } = req.body;
    try {
        const personajeActualizado = await Personaje.update(
            { nombre, universo, nivel, habilidades, fecha_creacion }, 
            { where: { id } } 
        );

        if (personajeActualizado[0] === 0) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }

        res.json({ mensaje: 'Personaje actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el personaje' });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const personajeEliminado = await Personaje.destroy({ where: { id } });

        if (personajeEliminado === 0) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }

        res.json({ mensaje: 'Personaje eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el personaje' });
    }
});


module.exports = router;
