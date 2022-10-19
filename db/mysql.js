const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "coinAddSchema",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Mysql Connected!!");
});

module.exports = db;
