require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const { PORT } = process.env;

app.get("/test", (req, res) => {
  res.status(200).send("Server is up and running!");
});

app.post("/api/upload", (req, res) => {
  // console.log(req.body);
  try {
    const { data } = req.body;
    const dataBuffer = new Buffer.from(data, "base64");
    const fileStream = fs.createWriteStream("finalvideo.webm", { flags: "a" });
    fileStream.write(dataBuffer);
    // console.log(dataBuffer);
    console.log(fileStream);
    return res.json({ gotit: true });
  } catch (error) {
    console.log(error);
    return res.json({ gotit: false });
  }
});

server.listen(PORT, () => {
  console.log("Server is up on port ", PORT);
});
