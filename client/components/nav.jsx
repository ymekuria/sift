import React, {Component} from 'react'
import LeftNav from './leftNav.jsx'
import TopNav from './topNav.jsx'



//this will be our main page for app
class Nav extends Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <div>
        <TopNav/>
        <LeftNav/>
      </div>
    ) 
  }
}


export default Nav


