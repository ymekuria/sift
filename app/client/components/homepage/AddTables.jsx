import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { router } from 'react-router';
import { routeActions } from 'react-router-redux';

class AddTables extends Component {

  render() {
    return (
      <div
        className={'addTableCardEmpty ' + this.props.class}
        style={styles.addTablestyle}
        zDepth={2}
        rounded={false}
      >
        <RaisedButton
          secondary={true}
          label="Create Table"
          onClick={() => {
            this.props.nav('/build');
          }}
          style={{ margin: 5, position: 'relative', bottom: -234 }}
        />
      </div>
    );
  }
}

const styles = {
  addTableStyl:{
    height: '21.3em',
    width: '19em',
    margin: '1em',
    textAlign: 'center',
    display: 'inline-block',
    border: '2px dashed #C5CAD9',
    marginBottom: '10px'
    // backgroundColor: '#E7E8EF'
  }
}

export default AddTables;
