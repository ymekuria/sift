import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class AddNode extends Component {

	constructor() {
		super();
		this.state = {
			columns: []
		}
	}

	componentDidMount() {
		// insert D3 code here
	}

	addNode(e) {
		e.preventDefault();
		var node = {};

		this.state.columns.map(function(column) {
			node[column] = this.refs[column].getValue();
		}.bind(this))

		this.refs.addNodeForm.reset();
		this.props.addNode(node);
	}

	render() {
		return (
			<form ref='addNodeForm' onSubmit={ this.addNode.bind(this) }>
				{ this.state.columns.map(function(column, i) {
				  	return (
				  		<TextField hintText='Enter value' ref={ column } key={i} floatingLabelText={ column } />
				  	)
					}) 
				}
				<RaisedButton type='submit' label="Default" fullWidth='true' />
			</form>
		)
	}
}

export default AddNode;