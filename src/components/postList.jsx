import React from 'react';
import Post from './post.jsx';

const PostList = (props) => {
  <div className="post-list">
    {props.posts.map((post, index) => <Post state={props.state} handleEdit={props.handleEdit} displayEditWindow={props.displayEditWindow} post={post} key={index} username={props.username}/>)}
  </div>
};

export default PostList;
