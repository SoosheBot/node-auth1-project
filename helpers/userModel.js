const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};



function add(user) {
  return db("users").insert(user);
}
