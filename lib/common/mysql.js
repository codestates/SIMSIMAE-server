const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

class SingletonBase {
  constructor() {
    if (!!SingletonBase.instance) {
      console.log("    already has instance.");
      console.log("    return existing instance.");

      return SingletonBase.instance;
    }
  }
}

module.exports = class DatabaseConnector extends SingletonBase {
  constructor() {
    super();
    this.config = {
      host: "simsimae-database.cxlafetwv62w.ap-northeast-2.rds.amazonaws.com",
      user: process.env.DATABASE_USERNAME || "admin",
      password: process.env.DATABASE_PASSWORD || "songyuijo28",
      database: process.env.DATABASE_NAME || "simsimae",
    };

    return this;
  }

  init() {
    this.connection = mysql.createConnection({
      ...this.config,
      multipleStatements: true,
    });

    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err.message);
        }
        resolve("ok");
      });
    });
  }

  terminate() {
    if (!this.connection || this.connection.state === "disconnected") {
      console.log("        cannot terminate connection of disconnected state.");
      return;
    }
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          reject(err.message);
        }

        // delete conneciton object
        delete this.connection;
        resolve("ok");
      });
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function (error, results) {
        if (error) reject(error);

        resolve(results);
      });
    });
  }
};
