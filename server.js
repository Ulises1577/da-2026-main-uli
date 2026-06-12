import express from 'express';
import apiRouter from './api/router.js';

//Creammos la instancia de express
const app = express();
const PORT = 3000;

app.use(express.json());

// Ahora todas tus URLs tendrán el prefijo automático http://localhost:3000
app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo exitosamente en http://localhost:${PORT}`);
});