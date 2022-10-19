const express = require("express");
require("dotenv").config();
const indexRoutes = require("./routes/index.routes");
const bodyparser = require("body-parser");
const app = express();

const port = process.env.PORT;

const cors = require("cors");
const db = require("./db/mysql");
const { getData } = require("./controller/CoinData");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRoutes);

app.listen(port, () => console.log(`server up on :- ${port}`));
