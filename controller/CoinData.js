const express = require("express");
const router = express.Router();
const db = require("../db/mysql");

// Initial route to check if the backend is running.
router.get("/", (req, res) => {
  res.status(200).send("hello world!!");
});

// to fetch the data from the mysql database
module.exports.getData = (req, res) => {
  const findQuery = "SELECT * FROM coinData;";
  db.query(findQuery, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json({ result });
    return result;
  });
};

// for posting data to mysql database
module.exports.PostCoinData = (req, res) => {
  // extracting values from body
  const { coinName, coinPrice } = req.body;

  // Checking that values should have some value.
  if (!coinName || !coinPrice) {
    return res.status(400).json({ message: "Please Fill all the fields" });
  }

  // trying to beautify the decimal numbers
  const roundedValue = Math.round((coinPrice * 1000) / 1000);

  // finding if the value is already present or not.
  const findQuery = "SELECT name,price FROM coinData WHERE price=? OR name=?";
  db.query(findQuery, [roundedValue, coinName], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.length > 0) {
      return res.status(400).json(result);
    } else {
      // Posting data on to the database.
      const query =
        "INSERT INTO coinData (name,price,time) VALUES (?,?,now());";
      db.query(query, [coinName, coinPrice], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          res.status(200).json({ message: "Successfully Inserted" });
        }
      });
    }
  });
};
