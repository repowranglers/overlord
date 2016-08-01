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
