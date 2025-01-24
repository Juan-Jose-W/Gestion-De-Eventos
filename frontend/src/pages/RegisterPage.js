import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '', variant: 'filled' }); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
            console.log('Registro exitoso:', response.data);
            
            localStorage.setItem('registerSuccess', 'Registro Exitoso');
            setAlert({ message: 'Registro exitoso:', severity: 'success', variant: 'filled' }); 
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' });
            }, 2000);
            setTimeout(() => {
                localStorage.removeItem('registerSuccess');
                navigate('/login'); 
            }, 2000);
        } catch (error) {
            console.error('Error en el registro:', error);
            if (error.response && error.response.status === 409) {
                
            } else {
                setAlert({ message: 'Usuario existente o Correo no válido. Intenta de nuevo.', severity: 'error', variant: 'filled' });
            setTimeout(() => {
                setAlert({ message: '', severity: '', variant: 'filled' });
            }, 2000);
            
            }
        }
    };

    return (
        <div className="container">
            <h2>Registro</h2>
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
                    }}}
                    >Registrar
                </Button>
                <Button 
                    onClick={() => navigate('/')} 
                    variant="contained" 
                    color="primary"
                    sx={{'&:hover':{transform:'scale(1.05)',transition:'transform 0.3s ease-in-out',
                        backgroundColor:'black'
                    }}}
                    >Volver a Inicio
                </Button>
            </form>
        </div>
    );
};

export default RegisterPage;
