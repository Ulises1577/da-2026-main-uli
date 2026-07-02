const checkRoleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.role) {
            return res.status(401).json({
                status: "error",
                message: "No autenticado: Falta de informacion"
            });
    }

    const hasPermission = allowedRoles.includes(req.session.role);

    if (!hasPermission) {
        return res.status(403).json({
            status: "error",
            message: "Acceso denegado. No tiene permisos para acceder a este recurso"
        });
    }

    next();
};
};

export default checkRoleMiddleware;