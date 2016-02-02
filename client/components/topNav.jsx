import React, {Component} from 'react';
import { AppBar, Colors, FontIcon } from 'material-ui'

let styles = {
  backgroundColor: '#121F1F',
  width: '110vw',
  margin: '-20'
}

const TopNav = () => (
  <AppBar style={styles} title="SIFT"/>
);

export default TopNav;
