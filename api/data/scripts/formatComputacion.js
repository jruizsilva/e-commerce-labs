var fs = require("fs");
let computacion = require("../api/computacion");
const uuid = "dffaaad9-c172-47fc-b3ac-b035d0d79bb1";

computacion = computacion.map((c) => {
  return {
    name: c.title,
    price: Math.ceil(c.price),
    image: c.thumbnail,
    condition: c.condition,
    stock: 5,
    description: null,
    brand: null,
    model: null,
    state: "active",
    category_id: "MLA1648",
    userId: uuid,
  };
});

let string = `module.exports = ${JSON.stringify(computacion)};`;

fs.writeFile("../format/computacion.js", string, (error) => {
  if (error) {
    console.log(error);
  }
});
