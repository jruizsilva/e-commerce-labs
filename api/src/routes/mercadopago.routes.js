const { Router } = require("express");
const router = Router();
const { addOrder } = require('../controllers/mercadopago.controller.js');


router.get('/', addOrder);
module.exports = router;
