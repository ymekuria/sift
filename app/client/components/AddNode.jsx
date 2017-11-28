import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class AddNode extends Component {
  addNode(e) {
    e.preventDefault();
    var node = {
      values: {}
    };

    this.props.columns.map(
      function(column) {
        node.values[column] = this.refs[column].getValue();
      }.bind(this)
    );

    this.refs.addNodeForm.reset();
    this.props.addNode(node);
  }

  render() {
    return (
      <div>
        <form ref="addNodeForm" onSubmit={this.addNode.bind(this)}>
          {this.props.columns.map(function(column, i) {
            return (
              <TextField
                hintText="Enter value"
                ref={column}
                key={i}
                floatingLabelText={column}
              />
            );
          })}
          <RaisedButton type="submit" label="Add Node" />
        </form>
      </div>
    );
  }
}

export default AddNode;
