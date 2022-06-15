const {  Answer } = require('../models/index.js')

const addAnswer = async (req, res, next) => {
  const { questionId, answer } =
    req.body;
  try {
    await Answer.create({ questionId, answer });
    res.status(200).json('ok')
  } catch (error) {
    next(error);
  }
};

const getAnswersByQuestionId = async (req, res ,next) => {

    const { questionId } = req.params;
    parseInt(questionId) 
    try {
        const answers = await Answer.findAll({
            where: {
                id: questionId,
            }
        });
        res.status(200).json(answers);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addAnswer,
    getAnswersByQuestionId,
}