const logMiddleware = (req, res, next) => {
    const fecha = new Date().toLocaleString();
    console.log(`[${fecha}] Peticion recibida: ${req.method} en ${req.url}`);
    next(); //Esta wea es para que no se quede colgada
};

export default logMiddleware;