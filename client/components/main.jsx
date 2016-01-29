import React, { Component } from 'react'
import Nav from './nav.jsx'

let viewStyles= {
  marginLeft: '60px',
  width: '90vw',
  height: '70vh'
}
//this will be the top level app that renders everyting to root
class Main extends Component {
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