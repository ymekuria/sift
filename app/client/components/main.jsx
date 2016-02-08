import React, { Component } from 'react'
import Nav from './nav.jsx'
import Homepage from './homepage.jsx'

let viewStyles= {
  width: '90vw',
  height: '70vh',
  float: 'left',
  marginLeft: '47px'
}
require('../css/style.css')


//this will be the top level app that renders everyting to root
class Main extends Component {

  inApplication() {
    //a helper to render our app based on location
    let location = this.props.location.pathname;
    if (location === '/' || location === '/signup' || location === '/signin') {
      return false;
    }
    return true;
  }


  render() {
    return (
      <div className='container'>
        {this.inApplication() ? <Nav/> : ''}
          <div className='routeContainer'>
          {this.props.children}
          </div>
      </div>
    )
  }
}

export default Main
