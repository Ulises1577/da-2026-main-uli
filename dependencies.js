// Aquí unimos las piezas en un único punto del sistema
import UserService from './services/user_service.js';
import UserModel from './mongo_models/user_model.js';

import sessionMongo from './mongo_models/session_mongo.js';
import { SessionService } from './services/session_service.js';
import { LoginService } from './services/login_service.js';

const userService = new UserService(UserModel);
// Exportamos el servicio ya listo y ensamblado para que lo usen las rutas
const sessionService = new SessionService(sessionMongo);
const loginService = new LoginService(userService, sessionService);

export default {
    userService,
    sessionService,
    loginService    
}