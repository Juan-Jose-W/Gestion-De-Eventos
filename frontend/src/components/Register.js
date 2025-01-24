import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
            console.log('Registro exitoso:', response.data);
            setAlert({ message: 'Registro Exitoso', severity: 'success' });
            setTimeout(() => {
                setAlert({ message: '', severity: '' });
            }, 3000);
        } catch (error) {
            console.error('Error en el registro:', error);
            if (error.response && error.response.status === 409) {
                setAlert({ message: 'Usuario existente. Por favor, crea otro.', severity: 'error' });
            } else {
                setAlert({ message: 'Error en el registro. Inténtalo de nuevo.', severity: 'error' });
            }
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            {alert.message && (
                <Alert severity={alert.severity} style={{ marginBottom: '16px' }}>{alert.message}</Alert>
            )}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
