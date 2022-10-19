const express = require("express");
const apiRoutes = express.Router();

const CoinDataController = require("../controller/CoinData");
apiRoutes.get("/coin", CoinDataController.getData);
apiRoutes.post("/coin", CoinDataController.PostCoinData);

module.exports = apiRoutes;
