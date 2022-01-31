require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const authRoutes = require("./routes/auth");
const hrRoutes = require("./routes/hr");
const candidateRoutes = require("./routes/candidate");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
if (process.env.NODE_ENV === "DEV") app.use(morgan("dev"));

const { PORT } = process.env;

app.use("/api", authRoutes);
app.use("/api", hrRoutes);
app.use("/api", candidateRoutes);

app.get("/api/test", (req, res) => {
  res.status(200).send({ message: "Server is up and running!" });
});

app.use(express.static(path.resolve(__dirname, "./client/build")));

if (process.env.NODE_ENV !== "DEV")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

server.listen(PORT, () => {
  if (process.env.NODE_ENV === "DEV")
    console.log(`Server is up on port ${PORT}`);
});
