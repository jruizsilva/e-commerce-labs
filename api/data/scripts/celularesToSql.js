var fs = require("fs");

const celulares = require("../format/celulares");

let string = "";

celulares.forEach((celular) => {
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
  } = celular;

  string += `INSERT INTO products (id, name, price, image, condition, stock, description, brand, model, state, category_id, "createdAt", "updatedAt") VALUES (uuid_generate_v4(), '${name}', '${price}', '${image}', '${condition}', '${stock}', ${description}, '${brand}', '${model}', '${state}' ,'${category_id}','2022-06-09', '2022-06-09');\n`;
});

fs.writeFile("../sql/celulares.sql", string, (error) => {
  if (error) {
    console.log(error);
  }
});
