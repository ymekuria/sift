import React, { Component } from 'react';
import DataEntry from './DataEntry';
import FlatButton from 'material-ui/lib/flat-button';
import CardActions from 'material-ui/lib/card/card-actions';
import Custom from './Custom';

class Build extends Component {
  constructor() {
    super();
    this.state = {
      select: true
    };
  }

  componentDidMount() {
    // this.showMeWhatIWant();
  }

  toggle() {
    let toggle = !this.state.select;
    this.setState({
      select: toggle
    });
  }

  render() {
    if (this.state.select) {
      return (
        <div>
          <CardActions>
            <FlatButton
              label="Generate Data"
              backgroundColor="white"
              hoverColor="white"
            />
            <FlatButton label="Custom Table" onClick={this.toggle.bind(this)} />
          </CardActions>
          <DataEntry />
        </div>
      );
    } else {
      return (
        <div>
          <CardActions>
            <FlatButton
              label="Generate Data"
              onClick={this.toggle.bind(this)}
            />
            <FlatButton
              label="Custom Table"
              backgroundColor="white"
              hoverColor="white"
            />
          </CardActions>
          <Custom />
        </div>
      );
    }
  }
}

export default Build;
