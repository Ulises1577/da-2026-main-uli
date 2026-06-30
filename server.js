import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './api/router.js';
import config from './config.js'; 
import logMiddleware from './middlewares/log_middleware.js';
import errorMiddleware from './middlewares/error_middleware.js';

//Creammos la instancia de express
const app = express();

app.use(express.json());
app.use(logMiddleware); //Registramos la peticion chango        
app.use('/', apiRouter); //Pues la rutas
app.use(errorMiddleware); //Registramos los erroress

async function StartServer() {
    try {
        console.log('Conectando a la base de datos...');

        await mongoose.connect(config.dbConnection);
        console.log('Conexion a la base de datos establecida');

        app.listen(config.port, () => {
            console.log(`Servidor escuchando en el puerto ${config.port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
}

StartServer();