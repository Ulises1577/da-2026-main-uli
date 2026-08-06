import express from 'express';
import dependencies from '../dependencies.js';

const { loginService } = dependencies;

const loginRouter = express.Router();

loginRouter.post('/', async (req, res, next) => {
    try {
        const login = await loginService.login(req.body);

        res.setHeader('Authorization', `Bearer ${login.authorizationToken}`);

        res.status(200).json({
            username: login.username,
            role: login.role
        });
    } catch (error) {
        next(error);
    }
});

export default loginRouter;