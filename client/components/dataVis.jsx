import React, { Component } from 'react'
import h from '../config/helpers'
import io from 'socket.io-client'
import _ from 'underscore'

let socket = io();

class DataVis extends Component {
  constructor() {
    super()
    this.state = {
      tablename: 'newTable',
      data: {
        name: '',
        children: []
      }
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
      rowId: "39136d4d-dd5b-4235-87bf-53901ed3fd5a",
      node: {
        lastName: 'Erik Brown changed this.'
      }
    };
    socket.emit('edit', node);
  }

  removeNode(node) {
    var node = {
      tablename: this.state.tablename,
      username: JSON.parse(localStorage.getItem('sift-user')).username,
      rowId: "433a7a25-0b17-4cee-90f5-9a1e53cba7ab"
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
    }.bind(this));

  }

  handleData(data) {
    var update;
    var tabledata = this.state.data;
    // inserting new data
    if (!data.old_val) {
      update = h.formatData(data.new_val)
      tabledata.children.push(update);
    // deleting data
    } else if (!data.new_val) {
      tabledata.children = tabledata.children.filter(function(row) {
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
      data: tabledata
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