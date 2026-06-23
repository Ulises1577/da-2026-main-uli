import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './api/router.js';
import config from './config.js'; 

//Creammos la instancia de express
const app = express();
app.use(express.json());        
app.use('/', apiRouter);

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