var fs = require("fs");
let celulares = require("../api/celulares");
const uuid = "dffaaad9-c172-47fc-b3ac-b035d0d79bb1";

celulares = celulares.map((c) => {
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
    category_id: "MLA1051",
    userId: uuid,
  };
});

let string = `module.exports = ${JSON.stringify(celulares)};`;

fs.writeFile("../format/celulares.js", string, (error) => {
  if (error) {
    console.log(error);
  }
});
