const { Router } = require('express');

const {
  getAnswersByQuestionId,
  addAnswer,
} = require('../controllers/answers.controller.js');
const router = Router();

router.post('/', addAnswer);

router.get('/:questionId', getAnswersByQuestionId);

module.exports = router;
