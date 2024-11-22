const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Usuario = require('../models/usuarios'); 


router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();  
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Validaciones para un nuevo usuario
router.post('/', [
    body('nombre_usuario').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('El email debe ser válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre_usuario, email, password } = req.body;
    try {
        const nuevoUsuario = await Usuario.create({ nombre_usuario, email, password });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Exportar el router
module.exports = router;
