import express from 'express';
import userService from '../services/user_service.js';
const userRouter = express.Router();

// GET /users -> Obtener todos los usuarios
userRouter.get('/', (req, res) => {
    const users = userService.getAllUsers();
    res.status(200).json(users); // Retornamos la lista real del mockup
});

// POST /users -> Crear un nuevo usuario
userRouter.post('/', (req, res) => {
    // req.body contiene los datos que envía el cliente desde el archivo .http
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser); // Código 201 Created según el estándar Full REST
});

// GET /users/:id -> Obtener un usuario por ID
userRouter.get('/:id', (req, res) => {
    const user = userService.getUserById(req.params.id);
    
    if (!user) {
        // Buenas prácticas REST: Si no existe, enviamos 404 Not Found
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    res.status(200).json(user);
});

// DELETE /users/:id -> Eliminar un usuario
userRouter.delete('/:id', (req, res) => {
    const deletedUser = userService.deleteUser(req.params.id);
    
    if (!deletedUser) {
        return res.status(404).json({ error: "No se pudo eliminar: Usuario no encontrado" });
    }
    
    res.status(200).json({ message: "Usuario eliminado con éxito", user: deletedUser });
});

export default userRouter;