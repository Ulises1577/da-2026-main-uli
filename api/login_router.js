import express from 'express';
import dependencies from '../dependencies.js';

const { loginService } = dependencies;

const loginRouter = express.Router();

loginRouter.post('/', async (req, res, next) => {
    try {
        const result = await loginService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export default loginRouter;