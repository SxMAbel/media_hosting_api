const express = require("express");
const RequestRouter = require("./routes/request.router");
const morgan = require("morgan");
const path = require("path");

const { port } = require("./config");
const app = express();

app.use(express.static(__dirname + "/uploads"));
app.use(morgan("combined"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE");
  next();
});
app.use("/api/v1", RequestRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/howto.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
