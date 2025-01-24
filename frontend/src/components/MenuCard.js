import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCard.css'; // Archivo CSS para estilizar la tarjeta

const MenuCard = () => {
    return (
        <div className="menu-card">
            <h2>Menú</h2>
            <Link to="/register">Registrar</Link>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/events">Lista de Eventos</Link>
        </div>
    );
};

export default MenuCard;
