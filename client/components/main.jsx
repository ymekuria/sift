import React, { Component } from 'react';
import Nav from './nav.jsx';
import fetch from 'whatwg-fetch';

let viewStyles= {
  marginLeft: '60px',
  width: '90vw',
  height: '70vh'
}

//this will be the top level app that renders everyting to root
class Main extends Component {

  constructor() {
    super();
    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    var storageRef = localStorage.getItem('user');

    if (storageRef) {
      this.setState({ user: JSON.parse(storageRef) });
    }
  }


  render() {
    return (
      <div>
        <Nav/>
        <div style={viewStyles}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main