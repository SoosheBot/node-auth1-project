const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken"); // after npm i jsonwebtoken -- 1. call it here

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
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

         // 2. use it here
        const token = signToken(user);

        // commented these out from Wed. project
        // req.session.loggedIn = true;
        // req.session.username = user.username;

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

// 3. create the function
function signToken(user) {
  //5. set up everything in the return to ....actually return stuff
  //5a.
  const payload = {
    userId: user.id,
    user: user.username
  };
  //5b. -- this will get commented out and put elsewhere, but is fine here for now
  const secret = "is it secret, is it safe"

  //4. create the return
  return jwt.sign(payload, secret, options);
};

module.exports = router;
