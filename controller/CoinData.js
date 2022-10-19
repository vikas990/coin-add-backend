const express = require("express");

const db = require("../db/mysql");

module.exports.getData = (req, res) => {
  const findQuery = "SELECT * FROM coinData;";
  db.query(findQuery, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json({ result });
  });
};

module.exports.PostCoinData = (req, res) => {
  const { coinName, coinPrice } = req.body;
  if (!coinName || !coinPrice) {
    return res.status(400).json({ message: "Please Fill all the fields" });
  }

  const roundedValue = Math.round((coinPrice * 1000) / 1000);
  const findQuery = "SELECT name,price FROM coinData WHERE price=? OR name=?";
  db.query(findQuery, [roundedValue, coinName], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.length > 0) {
      return res.status(400).json(result);
    } else {
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
