const {  Question, Answer } = require('../models/index.js')
// Me traigo el operador de sequelize 
const {Op} = require('sequelize') 

//      ---- GET DE PRODUCTOS -----


const addQuestion = async (req, res, next) => {
  const { userId, productId, question } =
    req.body;
  if(!userId && !productId && !question) res.send(404)

  try {
    await Question.create({ question, userId, productId });
  } catch (error) {
    next(error);
  }
};

const getQuestionsByProductId = async (req, res ,next) => {

    const { productId } = req.params;
    parseInt(productId) 

    try {
        const questions = await Question.findAll({
            include: [{
                model: Answer,
            }],
            where: {
                productId: productId,
            }
        });
        
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    addQuestion,
    getQuestionsByProductId,
}