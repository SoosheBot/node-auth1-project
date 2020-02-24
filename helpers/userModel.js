const db = require("../data/dbConfig");

module.exports = {
    // get,
    // getById,
    add,
    // update,
    // remove
  };

//   function get() {
//       return db("")
//   };


function add(user) {
    return db("").insert(user);
}
