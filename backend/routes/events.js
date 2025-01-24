const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware'); // Importar el middleware de autenticación
const router = express.Router();

// Crear un nuevo evento
router.post('/', authMiddleware, async (req, res) => { // Aplicar el middleware
    const { name, date, time, location, description } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario desde el middleware
    const newEvent = new Event({ name, date, time, location, description, userId }); // Incluir userId
    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Obtener todos los eventos
        res.status(200).json(events); // Enviar la respuesta con los eventos
    } catch (err) {
        res.status(500).json(err);
    }
});

// Obtener eventos del usuario autenticado
router.get('/my-events', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario desde el middleware
        const events = await Event.find({ userId }); // Filtrar eventos por el ID del usuario
        res.status(200).json(events); // Enviar la respuesta con los eventos
    } catch (err) {
        res.status(500).json(err);
    }
});

// Obtener un evento por ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); // Buscar el evento por ID
        if (!event) return res.status(404).json('Evento no encontrado'); // Manejar caso de evento no encontrado
        res.status(200).json(event); // Enviar la respuesta con el evento
    } catch (err) {
        res.status(500).json(err);
    }
});

// Actualizar un evento
router.put('/events/:id', authMiddleware, async (req, res) => { // Aplicar el middleware
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Eliminar un evento
router.delete('/:id', authMiddleware, async (req, res) => { // Aplicar el middleware
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json('Evento eliminado');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
