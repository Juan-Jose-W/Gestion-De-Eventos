const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Verificar el valor de MONGODB_URI

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión Exitosa a MongoDB.');
        app.listen(PORT, () => {
            console.log(`Server corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error en la conexion a MongoDB:', err);
    });
