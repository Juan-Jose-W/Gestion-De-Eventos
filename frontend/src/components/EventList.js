import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirigir a la página de inicio de sesión si no está autenticado
        } else {
            const fetchEvents = async () => {
                try {
                    const response = await axios.get('p://localhost:5000/aphtti/events', {
                        headers: {
                            Authorization: `Bearer ${token}` // Incluir el token en la solicitud
                        }
                    });
                    setEvents(response.data);
                } catch (error) {
                    console.error('Error al obtener eventos:', error);
                }
            };

            fetchEvents();
        }
    }, [navigate]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Incluir el token en la solicitud
                }
            });
            setEvents(events.filter(event => event._id !== id)); // Actualizar la lista de eventos
            console.log('Evento eliminado');
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-event/${id}`); // Redirigir a la página de edición del evento
    };

    return (
        <div>
            <h2>Lista de Eventos</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <h3>{event.name}</h3>
                        <p>{event.date} {event.time}</p>
                        <p>{event.location}</p>
                        <p>{event.description}</p>
                        <button onClick={() => handleEdit(event._id)}>Editar</button>
                        <button onClick={() => handleDelete(event._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
