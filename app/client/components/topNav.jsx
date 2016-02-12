import React, {Component} from 'react';
import { AppBar, Colors, FontIcon } from 'material-ui'
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

let styles = {
  backgroundColor: '#333333',
  width: '105%',
  position: 'relative',
  bottom: '8px',
  right: '10px',
  marginLeft: '-5px'
}
let title = {
  color: '#FDD53C',
  position: 'relative',
  marginTop: '5px',
  right: '15px'
}
let separator = {
  backgroundColor: '#FDD53C',
  position: 'relative',
  right: '18px',
  marginTop: '3px'

}
let user = {
  color: '#FDD53C',
  position: 'relative',
  top: '1px'
}
let signout = {
  color: '#FDD53C',
  marginTop: '14px',
  textColor: '#333333'
}
let signOutGroup = {
  paddingRight: '10px'
}

class TopNav extends Component {
  constructor() {
    super()
  }

  signout() {
    localStorage.removeItem('sift-user');
    return fetch('/signout', {
      credentials: 'same-origin'
    })
    .then(() => window.location.assign('/'));
  }

  render() {
    let username = JSON.parse(localStorage.getItem('sift-user'));
    return (
      <Toolbar color="#FDD53C" style={styles}>
        <ToolbarGroup>
          <ToolbarTitle style={title} text='SIFT'/>
        </ToolbarGroup>
        <ToolbarGroup style={signOutGroup} float="right">
          <ToolbarTitle style={user} text={ username.displayname}/>
          <ToolbarSeparator className='separator' style={separator}/>
          <RaisedButton labelColor='Black' backgroundColor='#FDD53C' style={signout} onClick={ this.signout } label={"Sign out"}/>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

TopNav.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default TopNav;
