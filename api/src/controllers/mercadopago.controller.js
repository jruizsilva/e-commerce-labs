const { Order, OrderDetail, Cart, ProductCart } = require('../models');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const addOrder = async (req, res, next) => {
  const { address, cart, userId } = req.body;
  
if(!userId) return res.status(404)
console.log(userId,address,cart.productcarts);
try{
  const order = await Order.create({
    price: cart.totalValue,
    address: address,
    status: "created",
    userId: userId,
  })
console.log('tyytytyty',order);
  let products = cart.productcarts.map(el=>{
      return el.id
  })
//bulkCreate

    const orderDetail = cart.productcarts.map(el=>{
       return { 
          state: "pending",
          quantity: el.quantity,
          totalprice: el.totalValue,
          productId: el.id,
       }
    })
console.log('*********----',orderDetail);

res.send('ok');
}catch(err){
console.log(err);
res.status(301).send(err)
}
}



// //Ruta que genera la URL de MercadoPago
// server.get('/', (req, res, next) => {
//   const id_orden = 1;

//   //Cargamos el carrido de la bd
//   const carrito = [
//     { title: 'Producto 1', quantity: 5, price: 10 },
//     { title: 'Producto 2', quantity: 15, price: 100 },
//     { title: 'Producto 3', quantity: 6, price: 200 },
//   ];

//   const items_ml = carrito.map(i => ({
//     title: i.title,
//     unit_price: i.price,
//     quantity: i.quantity,
//   }));

//   // Crea un objeto de preferencia
//   let preference = {
//     items: items_ml,
//     external_reference: `${id_orden}`,
//     payment_methods: {
//       excluded_payment_types: [
//         {
//           id: 'atm',
//         },
//       ],
//       installments: 3, //Cantidad máximo de cuotas
//     },
//     back_urls: {
//       success: 'http://localhost:3001/mercadopago/pagos',
//       failure: 'http://localhost:3001/mercadopago/pagos',
//       pending: 'http://localhost:3001/mercadopago/pagos',
//     },
//   };

//   mercadopago.preferences
//     .create(preference)
//     .then(function (response) {
//       console.info('respondio');
//       //Este valor reemplazará el string"<%= global.id %>" en tu HTML
//       global.id = response.body.id; //or id
//       global.sandbox_init_point = response.body.sandbox_init_point;
//       console.log(response.body);
//       res.json({
//         id: global.id,
//         sandbox_init_point: global.sandbox_init_point,
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

// //Ruta que recibe la información del pago
// server.get('/pagos', (req, res) => {
//   console.info('*******EN LA RUTA PAGOS *******', req);
//   const payment_id = req.query.payment_id;
//   const payment_status = req.query.status;
//   const external_reference = req.query.external_reference;
//   const merchant_order_id = req.query.merchant_order_id;
//   console.log('EXTERNAL REFERENCE ', external_reference);

//   //Aquí edito el status de mi orden
//   Order.findByPk(external_reference)
//     .then(order => {
//       order.payment_id = payment_id;
//       order.payment_status = payment_status;
//       order.merchant_order_id = merchant_order_id;
//       order.status = 'completed';
//       console.info('Salvando order');
//       order
//         .save()
//         .then(_ => {
//           console.info('redirect success');

//           return res.redirect('http://localhost:3000');
//         })
//         .catch(err => {
//           console.error('error al salvar', err);
//           return res.redirect(
//             `http://localhost:3000/?error=${err}&where=al+salvar`
//           );
//         });
//     })
//     .catch(err => {
//       console.error('error al buscar', err);
//       return res.redirect(
//         `http://localhost:3000/?error=${err}&where=al+buscar`
//       );
//     });

//   //proceso los datos del pago
//   //redirijo de nuevo a react con mensaje de exito, falla o pendiente
// });

// //Busco información de una orden de pago
// server.get('/pagos/:id', (req, res) => {
//   const mp = new mercadopago(ACCESS_TOKEN);
//   const id = req.params.id;
//   console.info('Buscando el id', id);
//   mp.get(`/v1/payments/search`, { status: 'approved' }) //success, pending{"external_reference":id})
//     .then(resultado => {
//       console.info('resultado', resultado);
//       res.json({ resultado: resultado });
//     })
//     .catch(err => {
//       console.error('No se consulto:', err);
//       res.json({
//         error: err,
//       });
//     });
// });

module.exports = {
  addOrder,
};
