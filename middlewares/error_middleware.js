const errorMiddleware = (err, req, res, next) => {
    console.error('Error detectado: ${err.message}');
    res.status(500).json({
        status: "error",
        message: err.message || "Error en el servidor"
    
    });
};

export default errorMiddleware;