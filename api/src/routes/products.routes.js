const { Router } = require('express')
const {getProducts, getProductsById} = require('../controllers/products.controller.js')
const router = Router()

router.get('/', getProducts)

router.get('/:productId', getProductsById);

module.exports = router