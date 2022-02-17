const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/db");
const routes = require("./routes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT | 5000;
connectDatabase();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
routes(app);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
