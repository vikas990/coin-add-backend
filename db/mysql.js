const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.ROOT_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Mysql Connected!!");
});

module.exports = db;
