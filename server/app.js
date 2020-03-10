if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT;
const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening On Port:", PORT);
});
