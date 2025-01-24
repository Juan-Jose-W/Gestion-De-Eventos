import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import Menu from '../components/Menu'; 
import { useNavigate } from 'react-router-dom';

const EventListPage = () => {
    const [events, setEvents] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error al obtener eventos:', error);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(filterName.toLowerCase()) &&
        event.location.toLowerCase().includes(filterCity.toLowerCase())
    );

    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    console.log('Token encontrado:', token);
    const isAuthenticated = token !== null;

    return (
        <div className="container">
            <Menu showMenu={false} />
            <h2>Lista de Eventos</h2>
            <div>
                <TextField 
                    label="Buscar por nombre" 
                    value={filterName} 
                    onChange={(e) => setFilterName(e.target.value)} 
                />
                <TextField 
                    label="Buscar por ciudad" 
                    value={filterCity} 
                    onChange={(e) => setFilterCity(e.target.value)} 
                />
                {isAuthenticated && ( // Mostrar el botón solo si el usuario está autenticado
                    <Button 
                        onClick={() => navigate('/add-event')} 
                        variant="contained" 
                        color="primary" 
                        style={{marginTop: '16px', marginLeft:'10px'}}
                        sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                            backgroundColor:'black'
                        }}}>Volver</Button>
                )}
                {!isAuthenticated && ( // Mostrar el botón solo si el usuario NO está autenticado
                    <Button 
                        onClick={() => navigate('/')}
                        variant="contained" 
                        color="primary" 
                        style={{ marginLeft: '19px', marginTop: '16px' }}
                        sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                            backgroundColor:'black'
                        }}}>
                        Volver a Inicio
                    </Button>
                )}
            </div>
            {filteredEvents.map(event => (
                <Card key={event._id} style={{ margin: '10px 0' }}>
                    <CardContent>
                        <Typography variant="h5">{event.name}</Typography>
                        <Typography color="textSecondary">{new Date(event.date).toLocaleDateString()}</Typography>
                        <Typography color="textSecondary">{new Date(event.date).toLocaleTimeString()}</Typography>
                        <Typography color="textSecondary">{event.location}</Typography>
                        <Typography>{event.description}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default EventListPage;
