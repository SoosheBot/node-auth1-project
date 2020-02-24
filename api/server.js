const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../routers/authRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);

server.get("/", (req,res) => {
    res.json({ message: "server running"})
})

module.exports = server;