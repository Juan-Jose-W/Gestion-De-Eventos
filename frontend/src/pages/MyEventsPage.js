import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField, Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const MyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '',variant: 'filled' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyEvents = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirigir a la página de inicio de sesión si no está autenticado
                return;
            }
            try {
                const response = await axios.get('http://localhost:5000/api/events/my-events', {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluir el token en la solicitud
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error al obtener mis eventos:', error);
            }
        };

        fetchMyEvents();
    }, [navigate]);

    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(filterName.toLowerCase()) &&
        event.location.toLowerCase().includes(filterCity.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Incluir el token en la solicitud
                }
            });
            setAlert({ message: 'Evento Eliminado', severity: 'error', variant: 'filled' });
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' });
            }, 2000);
            setEvents(events.filter(event => event._id !== id)); // Actualizar la lista de eventos
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };

    return (
        <div className="container">
            <h2>Mis Eventos</h2>
            {alert.message && (
                <Alert severity={alert.severity} variant={alert.variant} style={{ marginBottom: '16px' }}>{alert.message}</Alert>
            )}
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
                <Button
                    onClick={() => navigate('/add-event')}
                    variant="contained"
                    color="primary"
                    style={{marginTop: '16px', marginLeft:'10px'}}
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'
                    }}}
                    >Volver
                </Button>
            </div>
            {filteredEvents.map(event => (
                <Card key={event._id} style={{ margin: '10px 0' }}>
                    <CardContent>
                        <Typography variant="h5">{event.name}</Typography>
                        <Typography color="textSecondary">{new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString()}</Typography>
                        <Typography color="textSecondary">{event.location}</Typography>
                        <Typography>{event.description}</Typography>
                        <Button 
                            onClick={() => navigate(`/edit-event/${event._id}`)} // Redirigir al componente de edición
                            variant="contained" 
                            color="primary" 
                            style={{ marginRight: '10px' }}
                            sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                                backgroundColor:'black'
                            }}}
                            >Editar
                        </Button>
                        <Button 
                            onClick={() => handleDelete(event._id)} 
                            variant="contained" 
                            color="error"
                            sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                                backgroundColor:'red'
                            }}}
                            >Eliminar
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default MyEventsPage;
