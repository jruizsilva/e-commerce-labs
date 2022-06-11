// vamos a traernos todos los archivos
const { Router } = require('express')
const router = Router()
const productsRoutes = require('./products.routes.js')
const usersRoutes = require('./users.routes.js')
const categoriesRoutes = require('./categories.routes.js')

router.use('/products', productsRoutes)
router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)

module.exports = router