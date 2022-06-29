require("dotenv").config();
// instalar nodemon, sequelize, pg, express, morgan
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const routes = require("./src/routes/index");
const errorHandler = require("./src/utils/middlewares/errorHandler");
const setHeaders = require("./src/utils/middlewares/setHeaders");
const { conn } = require("./src/models");
const app = express();

const PORT = process.env.PORT || 3001;

//aca vamos a setear nuestros headers
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(setHeaders);

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

//aca vamos a setear todas nuestras rutas
app.use("/api", routes);

//aca importamos nuesto middleware de control de errores
app.use(errorHandler);

//aca vamos arracar nuestro server
conn.sync({ force: false }).then(() => {
  console.log("base de datos conectada");
  app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});

/* 
    Cada vez que se haga un evento en el servidor, se van aplicar los middlewars que hay entre :
    const app = express() y app.listen
*/
