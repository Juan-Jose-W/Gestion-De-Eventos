import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Alert } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

const EventFormPage = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '',variant: 'filled' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); //
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/events', { name, date, time, location, description }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Evento creado:', response.data);
            setAlert({ message: 'Evento creado', severity: 'success', variant: 'filled' });
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' });
            }, 2000);
            setTimeout(() => {
                navigate('/event-list');
            }, 2000);
        } catch (error) {
            console.error('Error al crear el evento:', error);
            setAlert({ message: 'Error al crear el evento. Inténtalo de nuevo.', severity: 'error', variant: 'filled' });
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' });
            }, 2000);
        }
    };

    const handleLogout = () => {
        setAlert({ message: 'Has cerrado sesión exitosamente.', severity: 'success', variant: 'filled' });
        setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/'); 
        }, 2000); 
    };

    return (
        <div className="container">
            <h2>Agregar Evento</h2>
            {alert.message && ( 
                <Alert severity={alert.severity} variant={alert.variant} style={{ marginBottom: '16px' }}>{alert.message}</Alert>
            )}
            <div>
                <Button 
                    onClick={() => navigate('/event-list')} 
                    variant="contained" 
                    color="primary" 
                    style={{marginBottom:'10px', marginRight:'10px'}}
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'}}}
                    >Ver Eventos
                </Button>
                <Button 
                    onClick={() => navigate('/my-events')} 
                    variant="contained" 
                    color="primary" 
                    style={{marginBottom:'10px'}}
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'
                    }}}
                    >Mis Eventos
                </Button>
            </div>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Nombre del evento" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    fullWidth 
                />
                <TextField 
                    label="Fecha del Evento"
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                    fullWidth 
                />
                <TextField 
                    label="Hora"
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    required 
                    fullWidth 
                />
                <TextField 
                    label="Ubicación" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                    fullWidth 
                />
                <TextField 
                    label="Descripción" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    fullWidth 
                    multiline 
                    rows={4} 
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'
                    }}}
                    >Crear Eventos
                </Button>
                <Button 
                    onClick={handleLogout} 
                    variant="contained" 
                    color="error" 
                    fullWidth 
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'red'
                    }}}>Cerrar Sesión</Button>
            </form>
        </div>
    );
};

export default EventFormPage;
