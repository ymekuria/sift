import React, { Component } from 'react'
import Nav from './nav.jsx'
import Homepage from './homepage.jsx'
require('../css/style.css')
//this will be the top level app that renders everyting to root
class Main extends Component {
  
  render() {
    return (
      <div className='container'>
        <Nav/>
          <div className='routeContainer'>
          {this.props.children || <Homepage/>}
          </div>
      </div>
    )
  }
}


export default Main