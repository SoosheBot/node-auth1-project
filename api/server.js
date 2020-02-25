const express = require('express');

const apiRouter = require('./apiRouter');
const configMiddleware = require('./configMiddleware');

const server = express();

configMiddleware(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.send('Server is running')
})

module.exports = server;