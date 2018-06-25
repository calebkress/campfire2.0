import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Axios from 'axios';
import StoryList from './components/storyList.jsx';
import PostList from './components/postList.jsx';
import InputField from './components/inputField.jsx';
import Modal from './components/modal.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      username: '',
      isLoggedIn: false,
      isNewStoryOpen: false,
      isLoginOpen: false,
      isSignupOpen: false,
      Title:'<--- Welcome To Campfire, select a story to get started',
      story_ID:0,
      user_ID:0,
      stories: [],
      currStory: [],
      editing: false,
      editingId: 0
    }
  }

  handleEdit(text, id,story_ID){
    if (text.length === 0){
      alert('Cannot submit empty field');
    }
    else {console.log('handling edit', text, id, story_ID)
    Axios.post('/campfire/updateMessage',{message:text,id:id})
    .then((data)=>{
      console.log('sending');
      Axios.get('/campfire/messages', {params:{story_ID:story_ID}})
      .then(({data}) =>{
        console.log('data before set state', )
        this.setState({currStory:data,editing:false})
      })
    })}
  }

  componentDidMount() {
    this.getTitles();
    setInterval(() =>
    Axios.get('/campfire/messages', {params:{story_ID:this.state.story_ID}})
    .then(({data}) =>{
      this.setState({currStory:data})
    }), 5000);
    //this.setState({counter: (this.state.counter + 1)}), 20000);
  }

  getTitles() {
    Axios.get('/campfire/stories')
    .then((data) => {
      this.setState({stories:data.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  displayEditWindow(id){
    console.log('displayEditWindow',id);
    this.setState({editing:true, editingId:id});
  }

  handleSubmitClick (text) {
    if (text.length === 0 ){
      alert('Cannot submit an empty field');
      return;
    } else if (text.length > 250){
      alert('Your submission is too long, please shorten it.');
      return;
    } else {
      document.getElementById('NewStoryText').value = '';
    }

    console.log('last item in currStory', this.state.currStory[this.state.currStory.length -1].username)
    if (this.state.currStory[this.state.currStory.length -1].username === this.state.username) {
      alert('Can\'t post twice in a row, wait for another user or check out another story');
      return;
    }

    Axios.post('/campfire/messages',{message:text,story_ID:this.state.story_ID,user_ID:this.state.user_ID})
    .then((data) => {
      // console.log('data in axios post', data.config.data);
      Axios.get('/campfire/messages', {params:{story_ID:this.state.story_ID}})
      .then(({data}) =>{
        console.log(data);
        this.setState({currStory:data});
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleTitleClick(story_ID, Title) {
    this.setState({story_ID:story_ID});
    //update currStory;
    Axios.get('/campfire/messages', {params:{story_ID:story_ID}
  })
    .then(({data}) =>{
      this.setState({currStory:data})
      this.setState({Title:Title})
    })
  .catch((err) => {
    console.log(err);
  });
  }

  toggleNewStoryModal () {
    this.setState({isNewStoryOpen: !this.state.isNewStoryOpen});
  }

  handleSignup(username, password) {
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data.length !== 0){
        alert('Username is already taken')
      } else {
        Axios.post('/campfire/users', {username:username, password:password})
          .then(({data}) => {
            console.log('data in handleSignup', data);
            this.setState({isLoggedIn: true, username: username, isSignupOpen: false})
          })
          .then(Axios.get('campfire/getUserID', {params:{username: username}
        })
        .then(({data}) =>{
          console.log(data, 'data at 99');
          console.log(data[0].user_ID);
          this.setState({user_ID: data[0].user_ID});
        })
      )
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleLogin(username, password) {
    Axios.get('/campfire/checkUserExists', {params:{username: username}
  })
    .then(({data}) => {
      if(data.length === 0){
        alert('Username doesn\'t exist');
      } else if(password !== data[0].password){
        alert('Incorrect password');
      } else {
        this.setState({isLoggedIn: true, username: username, isLoginOpen: false});
        Axios.get('campfire/getUserID', {params:{username: username}
      })
      .then(({data}) =>{
        console.log(data, 'data at 99');
        console.log(data[0].user_ID);
        this.setState({user_ID: data[0].user_ID});
      })
      }
    })
  }


  handleNewSubmission(title, text) {
    if (title.length === 0 || text.length === 0) {
      alert('You must submit a title and text');
    } else if (text.length > 250){
      alert('Your submission is too long please shorten it.')
    }
    else {
      console.log('ready to make new story');
      Axios.post('/campfire/stories',{Title: title})
      .then((data) => {
        Axios.get('/campfire/newStory',{params:{story_ID:this.state.story_ID}})
        .then(({data}) =>{

          var newStory_ID = data[data.length -1].story_ID;
          this.setState({story_ID:newStory_ID});
          //adding comment to database
          Axios.post('/campfire/messages', {message:text,story_ID:newStory_ID,user_ID:this.state.user_ID})
          .then((data) => {

            Axios.get('/campfire/messages', {params:{story_ID:newStory_ID}})
            .then(({data}) =>{
              this.setState({currStory:data});
            })
            .then((data) => {
              this.getTitles();
              this.setState({Title:title})
              this.setState({isNewStoryOpen:false})
            })
          })
        })
      })
    }
  }

  toggleLogin(){
    this.setState({isLoggedIn:!this.state.isLoggedIn});
  }

  startNewStory() {
    this.toggleNewStoryModal()
  }

  toggleLoginModal () {
    this.setState({isLoginOpen: !this.state.isLoginOpen});
  }

  startLogin() {
    this.toggleLoginModal()
  }

  toggleSignupModal () {
    this.setState({isSignupOpen: !this.state.isSignupOpen});
  }

  startSignup() {
    this.toggleSignupModal()
  }

  render() {
    var title = this.state.Title ? <h2>{this.state.Title}</h2> : <form className='newStoryForm'>
      <h3>Add a title and the first part of the story, then hit submit</h3>
      <input placeholder='Add Title Here'></input>
    </form>
    return (
      <div>
        {!this.state.isLoggedIn ?
        <div className="loginSignup">
          <Login showLogin={this.state.isLoginOpen} handleLogin={this.handleLogin.bind(this)}
          onClose={this.toggleLoginModal.bind(this)} />
          <Signup showSignup={this.state.isSignupOpen} handleSignup={this.handleSignup.bind(this)}
            onClose={this.toggleSignupModal.bind(this)} />
            <button className="loginBtn" onClick={() => this.startLogin.call(this)}>Login</button>
            <button className="signupBtn" onClick={() => this.startSignup.call(this)}>Signup</button>
          </div>
          :  <div className="logout"> <h3 className="welcomeMsg"> Welcome, {this.state.username}!</h3>
            <button className="loginBtn" onClick={() => this.toggleLogin.call(this)}>Log Out</button>
          </div>}
      <div className="container">
        <div className="sidebar">
          <div>
            {this.state.isLoggedIn ? <button onClick={() => this.startNewStory.call(this)}>Start New Story</button> : null}
          </div>
          <div>
            <StoryList handleTitleClick={this.handleTitleClick.bind(this)} stories={this.state.stories} />
          </div>
        </div>

        <Modal show={this.state.isNewStoryOpen} handleNewSubmission={this.handleNewSubmission.bind(this)}
          onClose={this.toggleNewStoryModal.bind(this)} />

        <div className='messageBox'>
          <div>
            {title}
            <PostList state={this.state} handleEdit={this.handleEdit.bind(this)} displayEditWindow={this.displayEditWindow.bind(this)} messages={this.state.currStory} username={this.state.username}/>
          </div>
          <div>
            <form onSubmit={(e) => {e.preventDefault(), this.handleSubmitClick(document.getElementById('NewStoryText').value)}}>
              {this.state.isLoggedIn && this.state.story_ID !== 0 ? <InputField /> : null}
              {this.state.isLoggedIn && this.state.story_ID !== 0 ? <button>Submit!</button> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
