import React from 'react';

const Post = (props) => {
  <div>
    <h4 className="post">{props.post.post}</h4>
    <h4 className="username">-{props.post.username} </h4>
    {props.username === props.post.username ? <button onClick={()=>{props.displayEditWindow(props.post.id)}}>edit</button> : ""}
    {props.state.editing && props.state.editingId === props.post.id ? <div> <input id="editText"/> <button onClick={()=> props.handleEdit(document.getElementById('editText').value, props.post.id,props.state.story_ID)}>Edit</button> </div> : null}
  </div>
}

export default Post;
