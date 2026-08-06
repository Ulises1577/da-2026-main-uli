import express from 'express';
import dependencies from '../dependencies.js';
import checkAuthorizationTokenMiddleware from '../middlewares/check_autorization_middleware.js';
import checkRoleMiddleware from '../middlewares/check_role_middleware.js';

const userRouter = express.Router();
const { userService } = dependencies; 

// GET ALL
userRouter.get('/', 
    checkAuthorizationTokenMiddleware,
    checkRoleMiddleware(['admin']),
    async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users.map(user => ({
            username: user.username,
            email: user.email,
            role: user.role
        })));
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
    }
);

//GET INDIVIDUAL (Por username)
userRouter.get('/:username', checkRoleMiddleware(['admin']), 
    async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(user.map(user => ({
            username: user.username,
            email: user.email,
            role: user.role
        }))); 
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el usuario', details: error.message });
    }
});

// POST (Crear)
userRouter.post('/',checkAuthorizationTokenMiddleware ,checkRoleMiddleware(['admin']), 
    async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        });
    } catch (error) {
        next(error); //Aca le pasamos el error al middleware de errores wachin
    }
});


//PATCH (Modificar) 
userRouter.patch('/:username',checkAuthorizationTokenMiddleware ,checkRoleMiddleware(['admin']),
     async (req, res) => {
    try {
        const { username } = req.params;
        const updatedUser = await userService.updateUser(username, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(500).json({ error: "Error al crear usuario" , details: error.message });
    }
});

//DELETE (Eliminar)
userRouter.delete('/:username', checkAuthorizationTokenMiddleware, checkRoleMiddleware(['admin']),
    async (req, res) => {
    try {
        const { username } = req.params;
        const deletedUser = await userService.deleteUser(username);
        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar usuario", details: error.message });
    }   
});

export default userRouter;