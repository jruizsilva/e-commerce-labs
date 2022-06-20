const { Router } = require('express');

const { addOrder } = require('../controllers/mercadopago.controller.js');
const router = Router();

router.post('/', addOrder);

//router.get('/:questionId', getAnswersByQuestionId);

module.exports = router;

