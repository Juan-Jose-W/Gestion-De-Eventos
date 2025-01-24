import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import '../styles/CommonStyles.css';

const LoginPage = () => {
    const [alert, setAlert] = useState({ message: '', severity: '', variant: 'filled' });
    useEffect(() => {
        const message = localStorage.getItem('registerSuccess');
        if (message) {
            setAlert({ message, severity: 'success', variant: 'filled' });
            localStorage.removeItem('registerSuccess');
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log('Inicio de sesión exitoso:', response.data);
            localStorage.setItem('token', response.data.token); // Almacenar el token en el almacenamiento local
            setAlert({ message: 'Inicio de sesión exitoso', severity: 'success', variant: 'filled' });
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' });
            }, 2000);
            setTimeout(() => {
                navigate('/add-event'); 
            }, 2000);
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setAlert({ message: 'Usuario o contraseña no válidos. Intenta de nuevo.', severity: 'error', variant: 'filled' });
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' });
            }, 2000);
        }
    };

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
            {alert.message && (
                <Alert severity={alert.severity} variant={alert.variant} style={{ marginBottom: '16px' }}>{alert.message}</Alert>
            )}
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Correo electrónico" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    fullWidth 
                />
                <TextField 
                    label="Contraseña" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    fullWidth 
                />
                <Button
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'
                    }}}>
                    Iniciar Sesión
                </Button>
                <Button 
                    onClick={() => navigate('/')} 
                    variant="contained" color="primary" 
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'
                    }}}>
                    Volver a Inicio
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
