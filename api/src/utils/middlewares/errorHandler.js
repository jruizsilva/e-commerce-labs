// Aca hacemos nuestro middleware de control de errores
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err)
    return res.status(status).send(message)
}
module.exports = errorHandler