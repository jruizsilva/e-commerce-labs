const { Product, Category } = require('../models/index.js')

const getProducts = async (req, res, next) => {
    try {
      const products = await Product.findAll({include: [{model: Category}]});
      if(products) res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProducts,
}