import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <div>
            <form>
              <input id='newTitle' placeholder='Add Title Here'></input>
              <div>
                	<textarea id='textForNewStory' placeholder='Start story here, 250 characters or less!' rows="5" cols="50"></textarea>
                </div>
              <button onClick={(e) => {
                  e.preventDefault()
                   this.props.handleNewSubmission(document.getElementById('newTitle').value, document.getElementById('textForNewStory').value)
                }}>Submit</button>
           </form>
          </div>
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
