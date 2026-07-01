import express from 'express';
import userRouter from './user_router.js';
import loginRouter from './login_router.js';

const apiRouter = express.Router();

// Todos los usuarios lo va a manejar la ruta de /users.
apiRouter.use('/users', userRouter);
apiRouter.use('/login', loginRouter);

export default apiRouter;