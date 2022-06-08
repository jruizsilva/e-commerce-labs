const {} = require('../models/index.js')

const getProducts = async (req, res, next) => {
    try {
        res.send('hellow word')
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    getProducts,
}