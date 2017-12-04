import React, { Component } from 'react';
import LeftNav from './LeftNav';
import TopNav from './TopNav';

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
