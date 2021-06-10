const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "simsimae",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port : process.env.DATABASE_PORT
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "simsimae",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port : process.env.DATABASE_PORT
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "simsimae",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port : process.env.DATABASE_PORT
  }
}
