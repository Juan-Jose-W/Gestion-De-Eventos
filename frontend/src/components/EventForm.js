import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@mui/material'; 

const EventForm = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '' }); 
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else if (id) {
            // Si hay un ID, cargar los datos del evento para editar
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/events/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}` 
                        }
                    });
                    const event = response.data;
                    setName(event.name);
                    setDate(event.date);
                    setTime(event.time);
                    setLocation(event.location);
                    setDescription(event.description);
                } catch (error) {
                    console.error('Error al obtener el evento:', error);
                }
            };
            fetchEvent();
        }
    }, [navigate, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (id) {
                // Si hay un ID, actualizar el evento existente
                const response = await axios.put(`http://localhost:5000/api/events/${id}`, { name, date, time, location, description }, {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluir el token en la solicitud
                    }
                });
                console.log('Evento actualizado:', response.data);
                setAlert({ message: 'Evento actualizado', severity: 'success' });
            } else {
                // Crear un nuevo evento
                const response = await axios.post('http://localhost:5000/api/events', { name, date, time, location, description }, {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluir el token en la solicitud
                    }
                });
                console.log('Evento creado:', response.data);
                setAlert({ message: 'Evento creado', severity: 'success' });
            }
            setTimeout(() => {
                setAlert({ message: '', severity: '' });
            }, 3000);
            navigate('/event-list');
        } catch (error) {
            console.error('Error al guardar el evento:', error);
            setAlert({ message: 'Error al guardar el evento. Inténtalo de nuevo.', severity: 'error' });
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Evento' : 'Agregar Evento'}</h2>
            {alert.message && (
                <Alert severity={alert.severity} style={{ marginBottom: '16px' }}>{alert.message}</Alert>
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre del evento" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <input type="text" placeholder="Ubicación" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <button type="submit">{id ? 'Actualizar Evento' : 'Crear Evento'}</button>
            </form>
        </div>
    );
};

export default EventForm;
