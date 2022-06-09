const { Product, Category, Question, Answer } = require('../models/index.js')

const getProducts = async (req, res, next) => {
    try {
      const products = await Product.findAll({include: [{model: Category}]});
      if(products) res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

const getProductsById = async (req, res ,next) => {

    const { productId } = req.params;

    try {
        const product = await Product.findAll({
            include: [{
                model: Category,
                model: Question,
            //  model: Answer, // error: answer is not asociated to Question!
            }],
            where: {
                id: productId,
            }
        });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductsById,
}