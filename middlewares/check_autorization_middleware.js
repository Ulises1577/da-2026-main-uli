import dependencies from '../dependencies.js';

const checkAuthorizationTokenMiddleware =  async (req, res, next) => {
    const authHeader =  req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: "error",
            message: "Acceso denegado. No se proporciono un token valido"
        });
    }

    const token = authHeader.split(' ')[1];
    // Aquí iría la lógica para verificar el token

    try {
        const session = await dependencies.sessionService.getByToken(token);

        if (!session) {
            return res.status(401).json({
                status: "error",
                message: "Acceso denegado. Token invalido"
            });
        }

        req.session = {
            username: session.username,
            role: session.role      
        };
        return next();

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al verificar el token",
            details: error.message
        }); 
    }
};

export default checkAuthorizationTokenMiddleware;