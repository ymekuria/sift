import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class AddNode extends Component {

	constructor() {
		super();
		this.state = {
			columns: ['lastName', 'firstName', 'company']
		}
	}

	componentDidMount() {

	}

	addColumn() {

	}

	render() {
		return (
			<form>
				{ this.state.columns.map(function(column) {
				  	return (
				  		<TextField hintText='Enter value' floatingLabelText={ column } errorText='This field is required'/>
				  	)
					}) 
				}
				<RaisedButton label="Default" fullWidth='true' />
			</form>
		)
	}
}

export default AddNode;