import React, { Component } from 'react';
import DataEntry from './DataEntry';
import Custom from './Custom';

class Build extends Component {

	constructor() {
		super();
		this.state = {
			select: true
		}
	}

	componentDidMount() {
		// this.showMeWhatIWant();
	}

	toggle() {
		let toggle = !this.state.select;
		this.setState({
			select: toggle
		})
	}


	render() {
		if (this.state.select) {
			return (
			<div>
			  <ul>
			    <li onClick={ this.toggle.bind(this) }>Show me Custom</li>
			  </ul>
			  <DataEntry />
			</div>
		)
		} else {
			return (
			<div>
			  <ul>
			    <li onClick={ this.toggle.bind(this) }>Show me Data Entry</li>
			  </ul>
			<Custom />
			</div>
		)
		}
	}
}

export default Build