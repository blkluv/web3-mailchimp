var mysql = require("mysql2");
var config = require("./config.json");
var dotenv = require("dotenv")
dotenv.config();

const mysqlConfig = !process.env.MYSQLDATABASE
  ? config.database_connection
  : {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      database: process.env.MYSQLDATABASE,
      password: process.env.MYSQLPASSWORD,
      port: process.env.MYSQLPORT,
      ...(process.env.SOCKETPATH && {socketPath: process.env.SOCKETPATH})
    };

var pool = mysql.createPool(mysqlConfig);

module.exports.pool = pool;
