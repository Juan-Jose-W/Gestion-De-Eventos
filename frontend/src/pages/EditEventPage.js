import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button , Alert} from '@mui/material';

const EditEventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [alert, setAlert] = useState({ message: '', severity: '',variant: 'filled' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvent(response.data);
            } catch (error) {
                console.error('Error al obtener el evento:', error);
                if (error.response) {
                    console.error('Respuesta de la API:', error.response.data);
                }
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/events/${id}`, event, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAlert({ message: 'Evento Actualizado', severity: 'success', variant: 'filled' });
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' }); 
            }, 2000);
            setTimeout(() => {
                navigate('/my-events');
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Edición de Evento</h2>
            {alert.message && (
                <Alert severity={alert.severity} variant={alert.variant} style={{ marginBottom: '16px' }}>{alert.message}</Alert>
            )}
            <form onSubmit={handleSubmit}>
                <TextField 
                name="name" 
                label="Nombre" 
                value={event.name || ''} 
                onChange={handleChange} 
                required
                fullWidth
                />
                <TextField 
                name="date" 
                label="Fecha" 
                type="date" 
                value={event.date ? event.date.split('T')[0] : ''} 
                onChange={handleChange} 
                required
                fullWidth
                />
                <TextField 
                name="time" 
                label="Hora" 
                value={event.time || ''} 
                onChange={handleChange} 
                required 
                />
                <TextField 
                name="location" 
                label="Ubicación" 
                value={event.location || ''} 
                onChange={handleChange} 
                required 
                />
                <TextField 
                name="description" 
                label="Descripción" 
                value={event.description || ''} 
                onChange={handleChange} 
                required 
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'}}}
                    >Actualizar Evento
                </Button>
                <Button 
                    onClick={() => navigate('/add-event')} 
                    variant="contained" 
                    color="error"
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'red'}}}
                    >Volver
                </Button>
            </form>
        </div>
    );
};

export default EditEventPage;
