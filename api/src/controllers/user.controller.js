const { User } = require('../models/index.js')
// Me traigo el operador de sequelize 
const {Op} = require('sequelize') 

const signUpUser = async (req, res, next) => {
    const {name, email, password, phone, address, role, state} = req.body
    try {
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address
        })
        console.log(user)
        res.json({message: 'Received'})
    } catch (error) {
        next(error)
    }
}

const signInUser = (req, res, next) => {
    res.json('signin')
}

const meUser = (req, res, next) => {
    res.json('me')
}

module.exports = {
    signUpUser,
    signInUser,
    meUser,
}