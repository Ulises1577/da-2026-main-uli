import express from 'express';
import dependencies from '../dependencies.js';

const { loginService } = dependencies;

const loginRouter = express.Router();

loginRouter.post('/', async (req, res, next) => {
    try {
        const result = await loginService.login(req.body);
        res.status(200).json({
            username: result.username,
            email: result.email,
            role: result.role
        });
    } catch (error) {
        next(error);
    }
});

export default loginRouter;