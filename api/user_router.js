import express from 'express';

const userRouter = express.Router();

// GET Ruta para obtener todos los usuarios
userRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'Aqui se obtienens los usuarios' });
});

// POST Ruta para crear un nuevo usuario
userRouter.post('/', (req, res) => {
    res.status(201).json({ message: 'Usuario creado exitosamente' });
});

// GET /users/:id -> Obtener un usuario específico por su ID (Recurso individual)
userRouter.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.status(200).json({ message: `Obteniendo datos del usuario con ID: ${userId}` });
});

// DELETE /users/:id -> Eliminar un usuario específico
userRouter.delete('/:id', (req, res) => {
    const userId = req.params.id;
    // Usamos 200 OK (o 204 No Content según prefieras luego)
    res.status(200).json({ message: `Usuario con ID ${userId} eliminado` });
});

export default userRouter;