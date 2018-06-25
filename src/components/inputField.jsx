import React, { Component } from 'react';

var max_chars = 250;

class InputField extends Component {
	getInitialState() {
    	return {
        	chars_left: max_chars
        };
    }

  handleChange(event) {
  	var input = event.target.value;
      this.setState({
      	chars_left: max_chars - input.length
      });
  }

	render() {
    	return (
					<div>
            	<textarea id="NewStoryText" rows="5" cols="50" onChange={this.handleChange}></textarea>
                <p>Characters Left: {this.state.chars_left}</p>
            </div>
        );
    }
};

export default InputField;
