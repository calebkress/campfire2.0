var db = require('./db.js');

var Posts = {};

// add a new post to the DB
Posts.addPost = (data) => {
  db('posts')
    .insert({
      post: data.post,
      story_ID: data.story_ID,
      user_ID: data.user_ID
    })
    .catch(error => {
      console.error(error)
    })
}

// update an existing post
Posts.updatePost = (data) => {
  return db('posts').update('post', 'data.post')
  .where({'id': data.id})
}

// return all posts from a story
Posts.selectAll = (data) => {
  return db('posts')
    .join('users', 'messages.user_ID', 'users.user_ID')
    .where({story_ID: data.story_ID})
    .select('posts.post', 'users.username', 'messages.id')
    .catch(error => {
      console.error(error)
    })
}

module.exports = Posts
