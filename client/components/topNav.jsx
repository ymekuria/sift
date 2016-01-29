import React, {Component} from 'react';
import { AppBar, Colors, FontIcon } from 'material-ui'

let styles = {
  backgroundColor: 'grey',
  height: '60px',
  width: '100vw',
  margin: '-10'
}


const TopNav = () => (
  <AppBar
    style={styles}
    title="SIFT"
  />
);

export default TopNav;