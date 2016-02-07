import React, { Component } from 'react'
import h from '../config/helpers'
import io from 'socket.io-client'
import _ from 'underscore'

let socket = io();

class DataVis extends Component {
  constructor() {
    super()
    this.state={
      tablename: 'newTable',
      data: {}
    }
  }

  addNode(node) {
    var node = {
      tablename: this.state.tablename,
      username: JSON.parse(localStorage.getItem('sift-user')).username,
      values: {
        lastname: 'Brown'
      }
    };
    socket.emit('add', node);
  }

  editNode(node) {
    var node = {
      tablename: this.state.tablename,
      username: JSON.parse(localStorage.getItem('sift-user')).username,
      rowId: '4006459e-c825-4926-9249-dcead36ffa04',
      node: {
        firstName: 'Erik Brown changed this.'
      }
    };
    socket.emit('edit', node);
  }

  removeNode(node) {
    var node = {
      tablename: this.state.tablename,
      username: JSON.parse(localStorage.getItem('sift-user')).username,
      rowId: '4006459e-c825-4926-9249-dcead36ffa04'
    };
    socket.emit('remove', node);
  }

  componentDidMount() {
    // TODO: setState with tablename
    let username = JSON.parse(localStorage.getItem('sift-user')).username;
    let tablename = username + '_' + this.state.tablename;
    var emitmessage = 'update ' + tablename;
    

    h.loadTable(tablename, function(data) {
      this.setState({
        data: data }
        );
    }.bind(this));

    socket.on(emitmessage, function(data) {
      this.handleData(data)
    });

  }

  handleData(data) {
    var update;
    var tabledata = this.state.data;
    // inserting new data
    if (!data.old_val) {
      update = tabledata.children
      update.push(data.new_val)
    // deleting data
    } else if (!data.new_val) {
      update = tabledata.children.filter(function(row) {
        return row.name !== data.old_val.id
      })
    // updating existing nodes
    } else {
      update = tabledata.children.each(function(row) {
        if (row.name === data.new_val.id) {
          var newChildren = [];
          _.each(data.new_val, function(value, key) {
            if (key !== 'id') {
              var obj = {};
              obj[key] = value;
              newChildren.push(obj);
            }
          })
          row.children = newChildren;
        }
      })
    }

    this.setState({
      data: update
    })
  }

  render() {
    return (
      <div className='dataVis'>
        <button onClick={ this.addNode.bind(this) }>Add Node</button>
        <button onClick={ this.editNode.bind(this) }>Edit Node</button>
        <button onClick={ this.removeNode.bind(this) }>Remove Node</button>
      </div>
    );
  }
}

export default DataVis