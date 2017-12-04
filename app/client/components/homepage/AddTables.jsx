import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class AddTables extends Component {

  render() {
    const style = {
      height: '21.3em',
      width: '19em',
      margin: '1em',
      textAlign: 'center',
      display: 'inline-block',
      border: '2px dashed #C5CAD9',
      marginBottom: '10px'
      // backgroundColor: '#E7E8EF'
    };
    const iconStyle = {
      marginLeft: 160,
      display: 'inline-block'
    };

    const svgStyle = {
      fontSize: '10px',
      height: '10px',
      width: '1px'
    };

    return (
      <div
        className={'addTableCardEmpty ' + this.props.class}
        style={style}
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

export default AddTables;
