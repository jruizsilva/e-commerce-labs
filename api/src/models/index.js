const {Sequelize} = require('sequelize')
const {dbHost, dbName, dbPassword, dbPort, dbUser} = require('../utils/config/index')
const modelProduct = require('./Product.js')
const modelUser = require('./User.js')
const modelOrder= require('./Order.js')
const modelCart= require('./Cart.js')
const modelCategory= require('./Category.js')
const modelFeedback= require('./Feedback.js')
const modelNotification = require('./Notification.js')
const modelQuestion = require('./Question.js')
const modelAnswer = require('./Answer.js')
const modelProductCart = require('./ProductCart.js')

const sequelize = new Sequelize( dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect:dbUser,
    logging: false
});

const Product = modelProduct(sequelize)
const Category = modelCategory(sequelize)
const User = modelUser(sequelize)
const Order = modelOrder(sequelize)
const Cart = modelCart(sequelize)
const Feedback = modelFeedback(sequelize)
const Notification = modelNotification(sequelize)
const Question = modelQuestion(sequelize)
const Answer = modelAnswer(sequelize)
const ProductCart = modelProductCart(sequelize)

//aca hacemos nuestras relaciones
Category.belongsToMany(Product, { through: 'ProductCategory'})
Product.belongsToMany(Category, { through: 'ProductCategory'})
Product.belongsToMany(User, { through: 'Favorite'})
User.belongsToMany(Product, { through: 'Favorite'})
Question.hasMany(Answer) 
Answer.belongsTo(Question)
User.hasMany(Question)
Question.belongsTo(User)
Product.hasMany(Question)
Question.belongsTo(Product)
Notification.belongsTo(User)
User.hasMany(Notification)
Notification.belongsTo(Product)
Product.hasMany(Notification)
Cart.hasOne(User)
Cart.hasMany(ProductCart)
ProductCart.belongsTo(Cart)
Product.hasMany(ProductCart)
ProductCart.belongsTo(Product)
User.hasMany(Product)
Product.belongsTo(User)
Order.hasOne(Feedback)
User.hasMany(Order, { as: 'IdUserSeller' })
Order.belongsTo(User, {as: 'IdUserSeller'})
User.hasMany(Order, { as: 'IdUserBuyer' })
Order.belongsTo(User, {as: 'IdUserBuyer'})
Product.hasMany(Order)
Order.belongsTo(Product)
module.exports = {
    conn: sequelize,
    Product, Category, User, Order, Cart,
    Feedback, Notification, Question, Answer, ProductCart
}