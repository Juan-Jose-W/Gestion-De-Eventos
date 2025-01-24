import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Archivo CSS para estilos del menú

const Menu = ({ showMenu }) => {
    if (!showMenu) return null; // No renderizar el menú si showMenu es false

    return (
        <nav className="menu">
            <ul>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/register">Registrar Usuario</Link></li>
                <li><Link to="/events">Lista de Eventos</Link></li>
                <li><Link to="/event/new">Crear Evento</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;
