const { Category } = require('../models/index.js');

const getCategories = async (req, resp, next)=>{
  try {
    const categories = await Category.findAll();
    resp.status(200).json(categories);
  } catch (error) {
    next()
  }
}

module.exports = {
  getCategories
}