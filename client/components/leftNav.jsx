import React, { Component } from 'react';
import { LeftNav, MenuItem, RaisedButton } from 'material-ui';

//refactor into css file
let styles = {
  zIndex: -1,
  backgroundColor: 'grey'
}

const LeftNavbar = () => (
  <div>
    <LeftNav
      style={styles}
      width={65}
      open={true}
    />
  </div>
);

export default LeftNavbar