const { Router } = require('express')
// importamos las funciones controladoras 
const {getProducts, getProductsByName} = require('../controllers/products.controller.js')
const router = Router()

router.get('/', getProducts) // funcion controladora de todos los productos
router.get('/search', getProductsByName)

module.exports = router