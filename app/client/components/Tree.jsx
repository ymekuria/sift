import React, { Component } from 'react'
import showGraph from './dndTree.js'
import $ from 'jquery'

class Tree extends Component {

  render() {
    $('#tree-container').empty();
    showGraph(this.props.data, this.props.removeNode); 
		return <div id='tree-container'></div>
	}
}

export default Tree;