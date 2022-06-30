const { Order, OrderDetail, Product, User } = require('../models/index.js');

const getOrders = async (req, res, next) => {
  try {
    //Con el include me salia un error al tratar de hacer la relacion
    //para no cambiar los modelos traje la informacion de las tres tablas 1 por 1
    const { orderdetailId } = req.query;
    let orderDetail = await OrderDetail.findOne({ where: {id: orderdetailId}});
    let order = await Order.findOne({
      where: {id: orderDetail.dataValues.orderId},
      include: {model: User}
    })
    let product = await Product.findOne({
      where: {id: orderDetail.dataValues.productId},
      include: {model: User}
    })
    res.status(200).json({...orderDetail, order, product});
  } catch (error) {
    next(error);
  }
};
const getSalesPayable = async (req, res, next) => {
  try {
    let { products } = req.body;

    let orderDetails = await OrderDetail.findAll({
      where: {productId: products, state: "completed"}
    });

    res.status(200).json(orderDetails);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getSalesPayable
}