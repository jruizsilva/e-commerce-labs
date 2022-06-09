const { Router } = require('express')
// importamos las funciones controladoras 
const {getProducts} = require('../controllers/products.controller.js')
const router = Router()

router.get('/', getProducts) // funcion controladora de todos los productos

module.exports = router