var fs = require("fs");
let computacion = require("../api/computacion");

computacion = computacion.map((c) => {
  return {
    name: c.title,
    price: c.price,
    image: c.thumbnail,
    condition: c.condition,
    stock: 1,
    description: null,
    brand: null,
    model: null,
    state: "active",
    category_id: "MLA1648",
  };
});

let string = `module.exports = ${JSON.stringify(computacion)};`;

fs.writeFile("../format/computacion.js", string, (error) => {
  if (error) {
    console.log(error);
  }
});
