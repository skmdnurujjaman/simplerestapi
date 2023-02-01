const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./db");
const authRouter = require("./routes/auth");
const infoRouter = require("./routes/info");
const authmiddleware = require("./middleware/authmiddleware");
connectDB();

const app = express();
const port = 5000;

//adding cors here, right now it is not needed but when we are calling from different domain it will be needed
app.use(cors());
app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.send("Working...");
});
app.use("/api", authRouter);
app.use("/api/data", authmiddleware, infoRouter);

app.get("*", function (req, res) {
  res.send("Not Found", 404);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
