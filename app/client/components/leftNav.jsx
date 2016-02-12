
import React, { Component } from 'react';
import { router } from 'react-router'
import { routeActions } from 'react-router-redux'
import { FontIcon, IconButton, LeftNav} from 'material-ui'
import store from '../store.jsx'

import Build from 'material-ui/lib/svg-icons/action/build'
import Stats from 'material-ui/lib/svg-icons/action/assessment'
import Info from 'material-ui/lib/svg-icons/action/info'
import Home from 'material-ui/lib/svg-icons/action/home'
import Colors from 'material-ui/lib/styles/colors'


//todo for 
let styles = {
  marginTop: '48px',
  backgroundColor: '#333333',
  paddingTop: '15px',
  textAlign: 'center',
  position: 'absolute',
  height: '110vh'
}
let iconStyles = {
  marginBottom: '15px',
  color: 'white'
}


class LeftNavbar extends Component {
  constructor(props) {
    super(props)
  }
  navigation(path) {
    const store = this.context.store;
    store.dispatch(routeActions.push(path));
  }

  render() {
    return (
      <div>
        <LeftNav
          style={styles}
          width={55}
          open={true}
        >
        <IconButton onClick={() => this.navigation('/home')} style={iconStyles}>
          <Home color='white' style={iconStyles}/>
        </IconButton>
        <IconButton iconStyle={iconStyles} onClick={() => this.navigation('/build')} style={iconStyles}>
          <Build color='white'/>
        </IconButton>
        <br/>
        <IconButton onClick={() => this.navigation('/vis')} style={iconStyles}>
          <Stats color='white'/>
        </IconButton>
        <br/>
        <IconButton onClick={() => this.navigation('/info')} style={iconStyles}>
          <Info color='white'/>
        </IconButton>

        </LeftNav>
      </div>
    )
  }
};

LeftNavbar.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object.isRequired
}

export default LeftNavbar

