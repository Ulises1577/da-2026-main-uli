// services/session_service.js
import crypto from 'crypto';

export class SessionService {
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }

    createToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    async createForUser(user) {
        const session = {
            username: user.username,
            authorizationToken: this.createToken(),
            role: user.role,
            open: new Date().toISOString()
        };
        return await this.sessionModel.create(session);
    }

    async getByToken(token) {
        return await this.sessionModel.findOne({ authorizationToken: token });
    }
}