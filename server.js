const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const colors = require("colors");
const morgan = require("morgan");
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");
connectDB();

app.use(express.json()); // so we can acc stuff frontend sends with req.body.orice

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 1-server js uses transactions route file to route
// 2 - /routes/transactions uses the methods from /controllers/tr..
// 3 - the controller uses /model/Transaction for CRUD
// 4 - models/Transaction defineste type, daca e required sau nu etc..

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(
    `s up on p ${PORT}, in mode: ${process.env.NODE_ENV}`.yellow.bold
  );
});
