import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log('Inicio de sesión exitoso:', response.data);
            localStorage.setItem('token', response.data.token); // Almacenar el token en el almacenamiento local
            console.log('Token almacenado:', response.data.token); // Mensaje de depuración
            navigate('/add-event'); // Redirigir a la página de creación de eventos
            console.log('Redirección ejecutada'); // Mensaje de depuración
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            console.log('Error en la solicitud de inicio de sesión'); // Mensaje de depuración adicional
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
