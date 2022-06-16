var fs = require("fs");
let celulares = require("../api/celulares");

celulares = celulares.map((c) => {
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
    category_id: "MLA1051",
  };
});

let string = `module.exports = ${JSON.stringify(celulares)};`;

fs.writeFile("../format/celulares.js", string, (error) => {
  if (error) {
    console.log(error);
  }
});
