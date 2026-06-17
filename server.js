import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './api/router.js';

//Creammos la instancia de express
const app = express();
const PORT = 3000;

app.use(express.json());

// Ahora todas tus URLs tendrán el prefijo automático http://localhost:3000
app.use('/', apiRouter);

mongoose.connect('mongodb://localhost:27017/mongo-api')
    .then(() => {
        console.log('Conexión a MongoDB exitosa en Docker');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo exitosamente en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err,message);
    });