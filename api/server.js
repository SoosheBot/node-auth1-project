const express = require('express');
// const session = require("express-session");
// const KnexStore = require("connect-session-knex")(session);
const router = require('express').Router();


const authRouter = require('../auth/authRouter');
const usersRouter = require('../users/usersRouter');
const restricted = require('../auth/restrictedMiddleware');



router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);


router.get('/', (req, res) => {
    res.send('API is running');
})

module.exports = router;



// const apiRouter = require('./apiRouter');
// const configMiddleware = require('./configMiddleware');
// // const knex = require('../data/dbConfig');

// const server = express();

// configMiddleware(server);


// server.use('/api', apiRouter);

// server.get('/', (req, res) => {
//     res.send('Server is running')
// })

// module.exports = server;