const express = require('express');

const router = express.Router();

const authRouter = require('../auth/authRouter');
const usersRouter = require('../users/usersRouter');
const restricted = require('../auth/restrictedMiddleware');

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);

router.get('/', (req, res) => {
    res.send('API is running');
})

module.exports = router;