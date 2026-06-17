import express from 'express';
import userService from '../dependencies.js'; // Importamos el servicio ya ensamblado

const userRouter = express.Router();

// GET ALL
userRouter.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

//GET INDIVIDUAL (Por username)
userRouter.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el usuario', details: error.message });
    }
});

// POST (Crear)
userRouter.post('/', async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {

        if (error.mesage === "El nombre de usuario ya existe. ") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Error al crear usuario" , details: error.message });
    }
});


//PATCH (Modificar) 
userRouter.patch('/', async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.mesage === "El nombre de usuario ya existe. ") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Error al crear usuario" , details: error.message });
    }
});

//DELETE (Eliminar)
userRouter.delete('/:username', async (req, res) => {
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