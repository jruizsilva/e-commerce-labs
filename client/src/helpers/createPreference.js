const back_urls_local = {
  success: "http://localhost:3000",
  failure: "http://localhost:3000",
  // pending: "http://localhost:3000",
};
const back_urls_deploy = {
  success: "https://e-commerce-labs.vercel.app",
  failure: "https://e-commerce-labs.vercel.app",
  // pending: "https://e-commerce-labs.vercel.app",
};

const formatPayer = (payer) => {
  const { email, name } = payer;

  return { email, name };
};
const formatCart = (cart) => {
  const { productcarts, user } = cart;
  const items = productcarts.map((cart) => {
    const { product, quantity } = cart;
    const { name: title, price: unit_price, description } = product;
    return { title, quantity, unit_price, description };
  });
  return items;
};

const createPreferenceObj = (cart, user) => {
  const items = formatCart(cart);
  const payer = formatPayer(user);
  const preference = {
    statement_descriptor: "Ecommerce App",
    binary_mode: true,
    items,
    payer,
    back_urls:
      process.env.NODE_ENV === "production"
        ? back_urls_deploy
        : back_urls_local,
  };
  return preference;
};

module.exports = createPreferenceObj;
