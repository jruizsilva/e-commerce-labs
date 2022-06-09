const { Product, Category } = require('../models/index.js')
// Me traigo el operador de sequelize 
const {Op} = require('sequelize') 

//      ---- GET DE PRODUCTOS -----

const getProducts = async (req, res, next) => {
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
        // Si no hay un nombre trae todos los productos
        else{
            const products = await Product.findAll({include: [{model: Category}]});
            if(products) res.status(200).json(products);
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProducts,
}