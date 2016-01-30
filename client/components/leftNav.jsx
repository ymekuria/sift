import React, { Component } from 'react';
import { LeftNav, MenuItem, RaisedButton } from 'material-ui';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';
//refactor into css file
let styles = {
  zIndex: -1,
  backgroundColor: 'grey'
}

const LeftNavbar = () => (
  <div>
    <LeftNav
      style={styles}
      width={55}
      open={true}
    />
  </div>
);

export default LeftNavbar