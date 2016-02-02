import React, { Component } from 'react';
import {router} from 'react-router'
import { FontIcon, IconButton, LeftNav, MenuItem, RaisedButton } from 'material-ui';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';
import Build from 'material-ui/lib/svg-icons/action/build';
import Stats from 'material-ui/lib/svg-icons/action/assessment';
import Info from 'material-ui/lib/svg-icons/action/info';
import Home from 'material-ui/lib/svg-icons/action/home';

//todo for 
let styles = {
  marginTop: '55px',
  backgroundColor: '#293535',
  paddingTop: '15px',
  textAlign: 'center',
  position: "absolute"
}
let iconStyles = {
  marginBottom: '15px'
}


class LeftNavbar extends Component {
  constructor(props) {
    super(props)
  }
  navigation(path) {
    console.log('navigating');
    this.context.router.push(path);
  }

  render() {
    return (
      <div>
        <LeftNav
          style={styles}
          width={55}
          open={true}
        >
        <IconButton onClick={() => this.navigation('/')} style={iconStyles}>
          <Home/>
        </IconButton>
        <IconButton onClick={() => this.navigation('/build')} style={iconStyles}>
          <Build/>
        </IconButton>
        <br/>
        <IconButton onClick={() => this.navigation('/vis')} style={iconStyles}>
          <Stats/>
        </IconButton>
        <br/>
        <IconButton onClick={() => this.navigation('/info')} style={iconStyles}>
          <Info/>
        </IconButton>

        </LeftNav>
      </div>
    )
  }
};

LeftNavbar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default LeftNavbar