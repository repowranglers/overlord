import db from '../db.js';

const User = module.exports;

User.findByUsername = function(username) {
  console.log('inside fBU', username);
  return db('users').where('username', '=', username)
    .then(function(rows) {
      console.log('returned from users check: ', rows);
      return rows[0];
    })
}

User.findById = function (id) {
 return db('users').where({ id: user_id }).limit(1)
   .then(function (rows) {
     return rows[0]
   })
}

User.create = function (incomingAttrs) {

 // Copy object to avoid mutation
 console.log("inside user.create! :", incomingAttrs);
 var attrs = Object.assign({}, incomingAttrs);

}
