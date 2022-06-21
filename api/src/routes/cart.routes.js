const { Router } = require('express')
const { addProduct, getCart, updateProductCart, deleteProductCart } = require('../controllers/cart.controller.js')
const router = Router()

router.post('/addProduct', addProduct);
router.get('/', getCart);
router.put('/', updateProductCart);
router.delete('/', deleteProductCart);

module.exports = router