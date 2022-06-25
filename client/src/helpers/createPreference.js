const back_urls_local = {
  success: "http://localhost:3001/api/mercadopago/payment",
  failure: "http://localhost:3000",
  // pending: "http://localhost:3000",
};
const back_urls_deploy = {
  success: "https://e-commerce-labs.vercel.app",
  failure: "https://e-commerce-labs.vercel.app",
  // pending: "https://e-commerce-labs.vercel.app",
};

const formatPayer = (payer, formik) => {
  const { street_name, street_number, zip_code, phone } = formik;
  const { email, name } = payer;
  const area_code = phone.substring(2, 4);
  const number = parseInt(phone.substring(4));
  return {
    email,
    name,
    phone: {
      area_code,
      number,
    },
    address: {
      street_name,
      street_number: parseInt(street_number),
      zip_code,
    },
  };
};
const formatCart = (cart) => {
  const { productcarts } = cart;
  const items = productcarts.map((cart) => {
    const { product, quantity } = cart;
    const {
      id,
      name: title,
      price: unit_price,
      image: picture_url,
      description,
    } = product;
    return {
      id,
      title,
      quantity,
      unit_price,
      picture_url,
      description: description ? description : "",
    };
  });
  return items;
};

const createPreferenceObj = (cart, user, formik) => {
  const items = formatCart(cart);
  const payer = formatPayer(user, formik);
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
