const express = require("express");
require("dotenv").config();
const indexRoutes = require("./routes/index.routes");
const bodyparser = require("body-parser");
const app = express();

const port = process.env.PORT || 3001;

const cors = require("cors");
const { getData } = require("./controller/CoinData");

const server = app.listen(port, () => console.log(`server up on :- ${port}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  io.on("fetchData", getData);
});

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRoutes);
