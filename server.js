import express from 'express';

//Creammos la instancia de express
const app = express();
const PORT = 3000;

app.use(express.json());

//Definimos una ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, el servidor está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});