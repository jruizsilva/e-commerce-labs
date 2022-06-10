const { Product, Category } = require('../models/index.js')
// Me traigo el operador de sequelize 
const {Op} = require('sequelize') 

//      ---- GET DE PRODUCTOS -----

const getProductsByName = async (req, res, next) => {
    console.log(req.query)
    const {name} = req.query 
    console.log(name)
    try {
        // Se fija si hay un nombre y si lo hay trae solo el que coincida con su nombre
        if(name){
            if(!name) return res.sendStatus(404)
            const product = await Product.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    },
                },
                include: { model: Category}
            })
            return res.json(product)
        }
       /*  // Si no hay un nombre trae todos los productos
        else{
            const products = await Product.findAll({include: [{model: Category}]});
            if(products) res.status(200).json(products);
        } */
        
    } catch (error) {
        next(error);
    }
  }

const getProducts = async (req, res, next) => {
  const { condition, sort, min_price, max_price, state, travel_cost } =
    req.query;
  try {
    let where = {};
    let order;
    if (condition) where.condition = condition;
    if (state) where.state = state;
    // if (travel_cost) where.travel_cost = travel_cost;
    if (min_price || max_price) {
      if (min_price && max_price) {
        where.price = {
          [Op.between]: [min_price, max_price],
        };
      }
      if (min_price && !max_price) {
        where.price = {
          [Op.gte]: min_price,
        };
      }
      if (!min_price && max_price) {
        where.price = {
          [Op.lte]: max_price,
        };
      }
      order = [["price", "ASC"]];
    }

    if (sort === "higher_price") order = [["price", "DESC"]];
    if (sort === "lower_price") order = [["price", "ASC"]];

    const products = await Product.findAll({
      include: [{ model: Category }],
      where,
      order,
    });
    if (products) res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductsByName,
};
