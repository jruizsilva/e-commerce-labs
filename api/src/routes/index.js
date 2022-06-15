// vamos a traernos todos los archivos
const { Router } = require('express')
const router = Router()
const productsRoutes = require('./products.routes.js')
const usersRoutes = require('./users.routes.js')
const categoriesRoutes = require('./categories.routes.js')
const questionsRoutes = require('./questions.routes.js')
const answersRoutes = require('./answers.routes.js')

router.use('/products', productsRoutes)
router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/questions', questionsRoutes)
router.use('/answers', answersRoutes)

module.exports = router