var fs = require("fs");

const computacion = require("../format/computacion");

let string = "";

computacion.forEach((product) => {
  let {
    name,
    price,
    image,
    condition,
    stock,
    description,
    brand,
    model,
    state,
    category_id,
  } = product;

  string += `INSERT INTO products (id, name, price, image, condition, stock, description, brand, model, state, category_id, "createdAt", "updatedAt") VALUES (uuid_generate_v4(), '${name}', '${price}', '${image}', '${condition}', '${stock}', ${description}, '${brand}', '${model}', '${state}' ,'${category_id}','2022-06-09', '2022-06-09');\n`;
});

fs.writeFile("../sql/computacion.sql", string, (error) => {
  if (error) {
    console.log(error);
  }
});
