const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/usersModel");

router.post("/register", (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        req.session.username = user.username;

        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "could not logout" });
      } else {
        res.status(200).json({ you: "logged out successfully" });
      }
    });
  } else {
    res.status(200).json({ bye: "felicia" });
  }
});

module.exports = router;
