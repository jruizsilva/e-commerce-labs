require("dotenv").config();
const Server = require("./server");
const { db } = require("./database/config");
const server = new Server();

const main = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    await db.sync({ force: false });
    server.listen();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
main();
