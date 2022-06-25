const { Question, Answer } = require('../models/index.js');

const addQuestion = async (req, res, next) => {
  const { userId, productId, question } = req.body;
  if (!userId && !productId && !question) res.status(404);

  try {
    await Question.create({ question, userId, productId });
    return res.status(200).send('ok');
  } catch (error) {
    next(error);
  }
};

const getQuestionsByProductId = async (req, res, next) => {
  const { productId } = req.params;
  // parseInt(productId);

  try {
    const questions = await Question.findAll({
      include: [
        {
          model: Answer,
        },
      ],
      where: {
        productId: productId,
      },
      order: [
        [ 'createdAt', 'DESC'],
        [ Answer, 'createdAt', 'DESC'],
      ],

    });

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addQuestion,
  getQuestionsByProductId,
};
