import React, { Component } from 'react';
import { LeftNav, MenuItem, RaisedButton } from 'material-ui';


let styles = {
  zIndex: -1,
  backgroundColor: 'grey'
}

class LeftNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  // handleToggle(){ this.setState({open: !this.state.open}); }

  // handleClose(){ this.setState({open: false}); }

  render() {
    return (
      <div>
        <LeftNav
          style={styles}
          width={65}
          open={this.state.open}
        />

      </div>
    );
  }
}

export default LeftNavbar