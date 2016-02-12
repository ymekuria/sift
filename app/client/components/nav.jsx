import React, {Component} from 'react'
import LeftNav from './leftNav.jsx'
import TopNav from './topNav.jsx'

class Nav extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='nav'>
        <TopNav/>
        <LeftNav/>
      </div>
    )
  }
}

export default Nav
