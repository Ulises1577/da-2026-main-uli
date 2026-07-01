import bcrypt from 'bcrypt';

export class LoginService {
    constructor(userService, sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }
    async login(loginData) {
        if (!loginData.username || !loginData.password) {
            throw new Error('Nombre de usuario y contraseña son obligatorios.');
        }

        const user = await this.userService.getUserByUsername(loginData.username);
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        const isMatch = await bcrypt.compare(loginData.password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta.');
        }

        const session = await this.sessionService.createForUser(user);
        return session;
    }
}
