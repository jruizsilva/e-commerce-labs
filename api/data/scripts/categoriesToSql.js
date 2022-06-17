var fs = require("fs");

const categories = require("../format/categories");

let string = "";

categories.forEach((category) => {
  let { id, name } = category;

  string += `INSERT INTO categories (id, name, "createdAt", "updatedAt") VALUES ('${id}', '${name}','2022-06-09', '2022-06-09');\n`;
});

fs.writeFile("../sql/categories.sql", string, (error) => {
  if (error) {
    console.log(error);
  }
});
