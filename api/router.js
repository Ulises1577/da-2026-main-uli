import express from 'express';
import userRouter from './user_router.js';

const apiRouter = express.Router();

// Todos los usuarios lo va a manejar la ruta de /users.
apiRouter.use('/users', userRouter);

export default apiRouter;