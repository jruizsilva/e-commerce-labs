const { Sequelize } = require("sequelize");

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  LOCAL_DB_USER,
  LOCAL_DB_NAME,
  LOCAL_DB_PASSWORD,
  LOCAL_DB_HOST,
} = process.env;

const db =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${LOCAL_DB_USER}:${LOCAL_DB_PASSWORD}@${LOCAL_DB_HOST}/${LOCAL_DB_NAME}`,
        { logging: false, native: false }
      );

// const db = new Sequelize({
//   database: DB_NAME,
//   dialect: "postgres",
//   host: DB_HOST,
//   port: 5432,
//   username: DB_USER,
//   password: DB_PASSWORD,
//   pool: {
//     max: 3,
//     min: 1,
//     idle: 10000,
//   },
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//     keepAlive: true,
//   },
//   ssl: true,
// });

module.exports = {
  db,
};
