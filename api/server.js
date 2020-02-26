const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);
const knex = require("../data/dbConfig.js");

const authRouter = require("../auth/authRouter.js");
const usersRouter = require("../users/usersRouter.js");
const restricted = require("../auth/restrictedMiddleware.js");


const server = express();

const sessionConfig = {
  name: "monster",
  secret: "keep it secret, keep it safe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  },
  store: new KnexStore({
    knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 15
  })
};


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);

server.get("/", (req, res) => {
  console.log(req.session);
  res.status(200).json({message: "API is running"});
});

module.exports = server;
