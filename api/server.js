const express = require('express');
// const session = require("express-session");
// const KnexStore = require("connect-session-knex")(session);


const apiRouter = require('./apiRouter');
const configMiddleware = require('./configMiddleware');
// const knex = require('../data/dbConfig');

const server = express();

configMiddleware(server);


server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.send('Server is running')
})

module.exports = server;