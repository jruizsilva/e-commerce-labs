var fs = require("fs");
const bcryptjs = require("bcryptjs");

bcryptjs.hash("123", 8).then((hashedPassword) => {
  fs.writeFile("../format/hashedpassword.js", hashedPassword, (error) => {
    if (error) {
      console.log(error);
    }
  });
});
