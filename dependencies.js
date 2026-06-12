// Aquí unimos las piezas en un único punto del sistema
import usersMockup from './mockups/user_mockups.js';
import UserService from './services/user_service.js';

// 1. Instanciamos o definimos nuestra infraestructura (bajo nivel)
const userRepository = usersMockup;

// 2. Instanciamos el servicio (alto nivel) e INYECTAMOS el repositorio
const userService = new UserService(userRepository);

// Exportamos el servicio ya listo y ensamblado para que lo usen las rutas
export default userService;