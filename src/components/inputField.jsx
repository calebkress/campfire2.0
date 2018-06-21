import React from 'react';

var max_chars = 250;

var InputField = React.createClass({
	getInitialState: function() {
    	return {
        	chars_left: max_chars
        };
    },
    handleChange(event) {
    	var input = event.target.value;
        this.setState({
        	chars_left: max_chars - input.length
        });
    },
	render: function() {
    	return (
					<div>
            	<textarea id="NewStoryText" rows="5" cols="50" onChange={this.handleChange}></textarea>
                <p>Characters Left: {this.state.chars_left}</p>
            </div>
        );
    }
});

export default InputField;
