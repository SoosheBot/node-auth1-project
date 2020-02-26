const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/usersModel");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(savedUser => {
      req.session.loggedIn = true;
      res.status(201).json(savedUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  // console.log(req.session);

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.username = user.username;

        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
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
