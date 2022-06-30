const { User, Cart, Product, ProductCart } = require("../models/index.js");

const updateTotalValueCart = async (cart) => {
  //se buscan todos los productos que tenga el carrito con sus valores totales para sumarlos y obtener el valor total del carrito
  let productsCart = await ProductCart.findAll({ where: { cartId: cart.id } });
  let total = productsCart
    .map((val) => val.totalValue)
    .reduce((a, b) => a + b, 0);
  return await cart.update({ totalValue: total });
};

const addProduct = async (req, res, next) => {
  try {
    const { productId, userId, quantity } = req.body;
    // Se busca el usuario propietario del carrito y el producto que se va agregar al carrito
    let user = await User.findOne({ where: { id: userId } });
    let product = await Product.findOne({ where: { id: productId } });

    let cart = null;
    //Si el usuario no tiene un carrito se crea y se le asigna uno
    if (!user.cartId) {
      cart = await Cart.create({ totalValue: product.price });
      user.update({ cartId: cart.id });
    } else {
      //si el usuario ya tiene un carrito se trae y se buscan todos los productos que tiene
      cart = await Cart.findOne({
        where: { id: user.cartId },
        include: { model: ProductCart },
      });
    }

    //se valida si el producto que se esta agregando no esta ya registrado en el carrito
    let findPr = null;
    findPr = cart.productcarts?.find((val) => val.productId == productId);
    if (findPr) {
      return res.status(401).send("Already on cart");
    } else {
      //Se crea la relación del carrito recien creado o encontrado con el producto ingresado,
      //Se crea la relacion producto carrito con los datos ingresados
      let totalValue = quantity * product.price;
      await ProductCart.create({
        quantity,
        totalValue,
        cartId: cart.id,
        productId: product.id,
      });
      updateTotalValueCart(cart);

      res.send("Successfull registration");
    }
  } catch (error) {
    next();
  }
};

const getCart = async (req, res, next) => {
  try {
    const { id } = req.query;
    let cart = await Cart.findAll({
      include: [
        { model: User, where: { id } },
        {
          model: ProductCart,
          include: { model: Product },
        },
      ],
      order: [[ProductCart, "createdAt", "DESC"]],
    });
    res.json(cart);
  } catch (error) {
    next();
  }
};

const updateProductCart = async (req, res, next) => {
  try {
    const { productCardId, price, val } = req.body;
    let productCart = await ProductCart.findOne({
      where: { id: productCardId },
    });
    let totalValue = productCart.totalValue + price * val;
    let quantity = productCart.quantity + val;
    await productCart.update({ quantity, totalValue });

    const cart = await Cart.findOne({ where: { id: productCart.cartId } });
    updateTotalValueCart(cart);

    res.send("ready");
  } catch (error) {
    next();
  }
};

const deleteProductCart = async (req, res, next) => {
  try {
    const { productCardId } = req.query;
    let productCart = await ProductCart.findOne({
      where: { id: productCardId },
    });
    await productCart.destroy();

    const cart = await Cart.findOne({ where: { id: productCart.cartId } });
    updateTotalValueCart(cart);
    res.send("ok");
  } catch (error) {
    next();
  }
};

module.exports = {
  addProduct,
  getCart,
  updateProductCart,
  deleteProductCart,
};
