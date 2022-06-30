const { Router } = require('express');
const { getOrders, getSalesPayable } = require('../controllers/orders.controller.js');

const router = Router()

router.get('/', getOrders);
router.post('/salespayable', getSalesPayable);

module.exports = router;
