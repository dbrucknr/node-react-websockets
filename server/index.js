const express = require("express");
const config = require("./config/app");
const router = require("./router");
const cors = require("cors");
const http = require("http");
const SocketServer = require("./socket");

const app = express();
const PORT = config.appPort;

app.use(express.urlencoded({ extended: true })); // Images
app.use(express.json()); // JSON Data from client
app.use(cors());
app.use(router);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

const server = http.createServer(app);
SocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
