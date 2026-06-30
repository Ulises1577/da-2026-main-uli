const checkAuthorizationTokenMiddleware = (req, res, next) => {
    const authHeader =  req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: "error",
            message: "Acceso denegado. No se proporiciono un token valido"
        });
    }

    const token = authHeader.split(' ')[1];
    // Aquí iría la lógica para verificar el token

    if (token === 'token-secreto-ulises') {
        req.session = {
            userId: "12345",
            username: "ulises_admin",
            role: "admin"
        };
        return next();

    } else {
        return res.status(403).json({
            status: "error",
            message: "Acceso denegado. Token inválido"
        });
    }
};

export default checkAuthorizationTokenMiddleware;