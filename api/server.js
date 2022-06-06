const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const productsRoute = require("./routes/products");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.productsPath = "/products";

    // Middlewares
    this.middlewares();

    // Rutas de la app
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Muestra por consola las peticiones que se hacen al backend
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.productsPath, productsRoute);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in PORT", this.port);
    });
  }
}

module.exports = Server;
