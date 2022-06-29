const { Router } = require('express');
const { getOrders } = require('../controllers/orders.controller.js');

const router = Router()

router.get('/', getOrders);

module.exports = router;
