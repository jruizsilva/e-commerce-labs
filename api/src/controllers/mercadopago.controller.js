const {
  Order,
  OrderDetail,
  Cart,
  ProductCart,
  User,
  Product,
  Notification,
} = require("../models");
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const axios = require("axios");

const { Op } = require("sequelize");

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const addOrder = async (req, res, next) => {
  const { preference, shipping } = req.body;

  try {
    const user = await User.findOne({
      include: [
        {
          model: Cart,
          include: [{ model: ProductCart }],
        },
      ],
      where: {
        email: preference.payer.email,
      },
    });

    const order = await Order.create({
      status: "created",
      price: user.cart.totalValue,
      street_name: shipping.street_name,
      street_number: shipping.street_number,
      zip_code: shipping.zip_code,
      phone: shipping.phone,
      country: shipping.country,
      city: shipping.city,
      userId: user.id,
    });

    user.cart.productcarts.map(async function (el) {
      OrderDetail.create({
        state: "pending",
        quantity: el.quantity,
        totalprice: el.totalValue,
        orderId: order.id,
        productId: el.productId,
      }).then((orderCreated) => {
        console.log(orderCreated);
        const cant = orderCreated.dataValues.quantity;
        const prodId = orderCreated.dataValues.productId;
        // Product.decrement({ stock: cant }, { where: { id: prodId } });
      });
    });
    console.log("******************", order.id);
    preference.external_reference = `${order.id}`;
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.info("respondio");
        //Este valor reemplazará el string"<%= global.id %>" en tu HTML
        // global.sandbox_init_point = response.body.sandbox_init_point;
        res.json({
          // sandbox_init_point: global.sandbox_init_point,
          preferenceId: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: err });
  }
};

const payment = async (req, res, next) => {
  console.log("----QUERY---: ", req.query);
  console.log("----BODY---: ", req.body);
  console.info("*******EN LA RUTA PAGOS *******");
  const payment_id = req.query.payment_id;
  const payment_status = req.query.status;
  const external_reference = parseInt(req.query.external_reference);
  const merchant_order_id = req.query.merchant_order_id;
  console.log("EXTERNAL REFERENCE ", external_reference);

  //Aquí edito el status de mi orden
  Order.findByPk(external_reference, {
    include: [{ model: User }],
  })
    .then((order) => {
      order.payment_id = payment_id;
      order.payment_status = payment_status;
      order.merchant_order_id = merchant_order_id;
      order.status = "completed";
      console.info("Salvando order");

      //add notification
      async function addNotification() {
        const productsPaymentIds = await OrderDetail.findAll({
          attributes: ["productId"],
          where: { orderId: order.id },
        });
        const producIds = productsPaymentIds.map((el) => el.productId);
        const productSeller = await Product.findAll({
          attributes: ["userId", "name", "id"],
          where: { id: { [Op.or]: producIds } },
        });

        productSeller.map(async function (el) {
          let message = `You have a sell on your publication ${el.name}.`;
          await Notification.create({
            message: message,
            state: "true",
            userId: el.userId,
            productId: el.id,
          });
          let messageBuyer = `You buy ${el.name}.`;
          await Notification.create({
            message: messageBuyer,
            state: "true",
            userId: order.userId,
            productId: el.id,
          });
        });
      }
      addNotification();

      order
        .save()
        .then(async () => {
          // Vacia el carrito
          const userId = order.userId;
          const cart = await Cart.findOne({
            include: [{ model: User, where: { id: userId } }],
          });
          await ProductCart.destroy({ where: { cartId: cart.id } });
          await cart.destroy();
        })
        .then(async () => {
          // Restar stock
          const orderProductDetails = await OrderDetail.findAll({
            where: { orderId: order.id },
          });
          console.log(orderProductDetails);
          orderProductDetails.forEach(async (p) => {
            const cant = p.dataValues.quantity;
            const prodId = p.dataValues.productId;
            await Product.decrement({ stock: cant }, { where: { id: prodId } });
            const productToEdit = await Product.findOne({
              where: { id: prodId },
            });
            if (productToEdit.dataValues.stock === 0) {
              await Product.update(
                { state: "paused" },
                { where: { id: prodId } }
              );
            }
          });
        })
        .then((_) => {
          console.info("redirect success");

          axios
            .post(`/api/forgotpassword`, {
              email: order.user.email,
              purchased: payment_id,
            })
            .then((r) => {
              const response = r.data;
              console.log(response.data);
            })
            .catch((err) => {
              console.log("/api/forgotpassword", err);
            });

          return res.redirect(
            process.env.NODE_ENV === "production"
              ? "https://e-commerce-labs.vercel.app/home"
              : "http://localhost:3000/home"
          );
        })
        .catch((err) => {
          console.error("error al salvar", err);
          return res.redirect(
            process.env.NODE_ENV === "production"
              ? `https://e-commerce-labs.vercel.app/?error=${err}&where=al+salvar`
              : `http://localhost:3000/?error=${err}&where=al+salvar`
          );
        });
    })
    .catch((err) => {
      console.error("error al buscar", err);
      return res.redirect(
        process.env.NODE_ENV === "production"
          ? `https://e-commerce-labs.vercel.app/?error=${err}&where=al+buscar`
          : `http://localhost:3000/?error=${err}&where=al+buscar`
      );
    });
};

const cancelPayment = async (req, res, next) => {
  console.log("**** Failure route ****");
  console.log(req.query);

  return res.redirect(
    process.env.NODE_ENV === "production"
      ? "https://e-commerce-labs.vercel.app/home"
      : "http://localhost:3000/home"
  );
};

module.exports = {
  addOrder,
  payment,
  cancelPayment,
};
