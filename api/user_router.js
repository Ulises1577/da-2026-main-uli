import express from 'express';
import userService from '../dependencies.js'; // Importamos el servicio ya ensamblado
const userRouter = express.Router();

// GET /users -> Obtener todos los usuarios
userRouter.get('/', (req, res) => {
    const users = userService.getAllUsers();
    res.status(200).json(users); // Retornamos la lista real del mockup
});

//GET obtener nombre de usuario
userRouter.get('/:username', (req, res) => {
    const user = userService.getUserByUsername(req.params.username);
    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
});

// POST /users -> Crear un nuevo usuario
userRouter.post('/', (req, res) => {
    // req.body contiene los datos que envía el cliente desde el archivo .http
    const result = userService.createUser(req.body);
    //Si el servicio devuelve error usamos el 400 Bad Request.
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(201).json(result); // Código 201 Created según el estándar Full REST
});

//PATCH /users/:username Pa modifica' aweonao
userRouter.patch('/:username', (req, res) => {
    const updatedUser = userService.updateUser(req.params.username, req.body);
    if (!updatedUser) {
        return res.status(404).json({ error: "No se pudo modificar: Usuario no encontrado" });
    }
    res.status(200).json(updatedUser);
});

// DELETE /users:username -> Eliminar por nomre del usuario chavalin
userRouter.delete('/:username', (req, res) => {
    const deletedUser = userService.deleteUser(req.params.username);
    if (!deletedUser) {
        return res.status(404).json({ error: "No se pudo eliminar: Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado con éxito", user: deletedUser });
}
);


export default userRouter;