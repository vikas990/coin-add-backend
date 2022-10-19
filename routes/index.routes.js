const express = require("express");
const router = express.Router();

const CoinDataRoutes = require("./coinData.routes");

router.use("/", CoinDataRoutes);

module.exports = router;
