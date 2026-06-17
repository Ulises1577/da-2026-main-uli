// Aquí unimos las piezas en un único punto del sistema
import UserService from './services/user_service.js';
import UserModel from './mongo_models/user_model.js';

const userService = new UserService(UserModel);
// Exportamos el servicio ya listo y ensamblado para que lo usen las rutas
export default userService;