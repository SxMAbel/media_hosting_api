import express from "express";
import morgan from "morgan";
import path from "path";

import RequestRouter from "./routes/request.router";
import config from "./config";

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

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/test.html"));
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
