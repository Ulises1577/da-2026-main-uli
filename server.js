import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './api/router.js';
import config from './config.js'; 

//Creammos la instancia de express
const app = express();

// Ahora todas tus URLs tendrán el prefijo automático http://localhost:3000
app.use('/', apiRouter);
app.use(express.json());

mongoose.connect(config.dbConnection)
    .then(() => {
        console.log('Conexión a MongoDB exitosa en Docker');
        app.listen(config.port, () => {
            console.log(`🚀 Servidor corriendo exitosamente en http://localhost:${config.port}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err,message);
    });