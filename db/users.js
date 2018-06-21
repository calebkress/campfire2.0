var db = require('./db.js');

var Users = {};

// add a user
Users.addUser = (data) => {
  db('users')
    .insert({
      username: data.username,
      password: data.password
    })
    .catch(err => {
      console.error(err)
    })
}

// select all users
Users.selectAll = (data) => {
  db('users').select('*')
}

// select a user by username
Users.findUser = (data) => {
  return db('users').where({username: data}).select('*')
}

// find a username based on user id
Users.findUsername = (data) => {
  return db('users').where({user_ID: data.user_ID}).select('username')
}

module.exports(Users)
