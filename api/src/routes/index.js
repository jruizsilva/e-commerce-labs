// vamos a traernos todos los archivos
const { Router } = require('express')
const router = Router()
const productsRoutes = require('./products.routes.js')
const userRoutes = require('./user.routes.js')

router.use('/products', productsRoutes)
router.use('/user', userRoutes)

module.exports = router