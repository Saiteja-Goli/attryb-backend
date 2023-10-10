const express = require("express");
const cors=require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/userRouter");
const carRouter = require("./routes/carRouteer");
const oemRouter = require("./routes/oemRouter");
const inventoryRouter = require("./routes/inventoryRoute");
const secHandCarRouter = require("./routes/sechandCarsRouter");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.use("/user", userRouter);
app.use('/oemspecs',oemRouter)
app.use('/inventory',inventoryRouter)
app.use('/sechandcars',secHandCarRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`Listining on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
