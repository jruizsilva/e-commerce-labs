const { Router } = require('express');

const {
  getQuestionsByProductId,
  addQuestion,
} = require('../controllers/questions.controller.js');
const router = Router();

router.post('/', addQuestion);

router.get('/:productId', getQuestionsByProductId);

module.exports = router;
