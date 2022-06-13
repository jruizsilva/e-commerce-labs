// aca vamos a interactuar con nuestro entorno
require("dotenv").config(); // ahora puedo acceder a mis variables de entorno

module.exports = {
  dbUser: process.env.DB_USER || "postgres",
  dbName: process.env.DB_NAME || "ecommerce",
  dbPort: process.env.DB_PORT || "5432",
  dbHost: process.env.DB_HOST || "localhost",
  host: process.env.HOST || "localhost",
  dbPassword: process.env.DB_PASSWORD || "admin",
};
