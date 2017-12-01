import React, { Component } from 'react';
import LeftNav from './LeftNav.jsx';
import TopNav from './TopNav.jsx';

class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="nav">
        <TopNav />
        <LeftNav />
      </div>
    );
  }
}

export default Nav;
