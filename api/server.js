const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);

const authRouter = require("../auth/authRouter");
const usersRouter = require("../users/usersRouter");
const restricted = require("../auth/restrictedMiddleware");
const knex = require("../data/dbConfig");

const server = express();

const sessionConfig = {
  name: "monster",
  secret: "keep it monster, keep it monstrous",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true,
  },
  store: new KnexStore({
    knex,
    // tablename: "session",
    // createtable: true,
    // sidfieldname: "sid",
    // clearInterval: 1000 * 60 * 10
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("api/auth", authRouter);
server.use("api/users", restricted, usersRouter);

server.get("/", (req, res) => {
    console.log(req.session)
  res.send("API is running");
});

module.exports = server;

