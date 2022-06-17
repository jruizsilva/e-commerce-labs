var fs = require("fs");

const users = require("../format/users");

let string = "";

users.forEach((user) => {
  let { name, email, password, phone, address, profile_image, role, state } =
    user;

  string += `INSERT INTO users (id, name, email, password, phone, address, profile_image, role, state, "createdAt", "updatedAt") VALUES (uuid_generate_v4(),'${name}', '${email}', '${password}', ${phone}, '${address}', ${profile_image}, '${role}', '${state}', '2022-06-09', '2022-06-09',);\n`;
});

fs.writeFile("../sql/users.sql", string, (error) => {
  if (error) {
    console.log(error);
  }
});
