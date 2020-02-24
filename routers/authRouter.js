const express = require("express");

const User = require("../helpers/userModel");

const router = express.Router();

router.get("/", (req,res) => {
    User.get().then().catch();
})

router.post("/register", (req, res) => {
    User.add().then().catch();
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.add(req.body).then().catch();
})

module.exports = router
module.exports = router;