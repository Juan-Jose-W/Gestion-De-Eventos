import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Bienvenido a la Aplicación de Gestión de Eventos</h1>
            <p>Organiza tus eventos de manera fácil y rápida.</p>
            <div className="button-container">
                <Link to="/login" className="button">Iniciar Sesión</Link>
                <Link to="/register" className="button">Registrarse</Link>
                <Link to="/event-list" className="button">Ver Todos los Eventos</Link>
            </div>
        </div>
    );
};

export default HomePage;
