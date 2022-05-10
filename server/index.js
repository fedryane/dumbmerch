//import env
require("dotenv").config();

// import express
const express = require("express");

// variable app express
const app = express();

// import cors
const cors = require("cors"); //agar client dapat memakai API dimana CRUD membutuhkan cors di server

// import router
const router = require("./src/routes");

// create app.use for JSON with (express.json)
app.use(express.json());

// app use cors
app.use(cors());

// import package socket io
const http = require("http");
const { Server } = require("socket.io");

// add after app initialization
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000", // define client origin if both client and server have different origin
  },
});
require("./src/socket")(io);

// import uploads
app.use("/uploads", express.static("uploads"));

// creating endpoint grouping and router
app.use("/api/v1", router);

const port = 8080;

// listening port
server.listen(port, () => console.log(`Listening on port ${port}`));
