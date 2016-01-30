import React, { Component } from 'react'
import Nav from './nav.jsx'
import Homepage from './homepage.jsx'
let viewStyles= {
  width: '90vw',
  height: '70vh',
  float: 'left',
  marginLeft: '47px'
}
//this will be the top level app that renders everyting to root
class Main extends Component {

  renderHome() {
    return (
      <Homepage/>
    )
  }
  
  render() {
    return (
      <div>
        <Nav/>
        <div style={viewStyles}>
        {this.props.children || this.renderHome()}
        </div>
      </div>
    )
  }
}


export default Main