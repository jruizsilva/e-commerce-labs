// vamos a traernos los archivos: mi route de characters y mi route de episodes
const { Router } = require('express')
const router = Router()
const productsRoutes = require('./products.routes.js')
const usersRoutes = require('./users.routes.js')

router.use('/products', productsRoutes)
router.use('/users', usersRoutes)

module.exports = router