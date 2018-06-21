var db = require('../db/db.js');
var express = require('express');
var bodyParser = require('body-parser');
// models
var Users = require('../db/users.js');
var Posts = require('../db/posts.js');
var Stories = require('../db/stories.js');

var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + '../dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8000, function() {
  console.log('Listening on port 8000')
});

// add a user
app.post('/campfire/users', (req, res) => {
  Users.addUser(req.body)
  res.end()
});

// add a post
app.post('/campfire/posts', (req, res) => {
  Posts.addPost(req.body)
  res.send(req.body.post)
});

// add a new story
app.post('/campfire/stories', (req, res) => {
  Stories.addStory(req.body)
  res.end()
});

// select all users
app.get('/campfire/users', (req, res) => {
  Users.selectAll()
    .then(data => {res.send(data)})
});

// select posts by story ID
app.get('/campfire/posts', (req, res) => {
  var param = req.query.story_ID
  Posts.selectAll({story_ID: param})
    .then(data => {res.send(data)})
});

// select all story titles
app.get('/campfire/stories', (req, res) => {
  
})
