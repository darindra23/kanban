if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT;
const { errorHandler } = require("./middlewares/errorHandler");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("show-data", data => {
    socket.broadcast.emit("realtime-data", data);
  });
});

http.listen(PORT, () => console.log(`listening on port:`, PORT));
