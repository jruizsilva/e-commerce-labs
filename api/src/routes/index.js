// vamos a traernos todos los archivos
const { Router } = require('express')
const router = Router()
const productsRoutes = require('./products.routes.js')

router.use('/products', productsRoutes)

module.exports = router