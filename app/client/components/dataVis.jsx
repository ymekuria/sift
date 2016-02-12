import React, { Component } from 'react'
import h from '../config/helpers'
import _ from 'underscore'
import showGraph from './dndTree.js'
import d3 from 'd3'
import $ from 'jquery'
import io from 'socket.io-client'
import store from '../store'
import AddNode from './AddNode'
import Tree from './Tree'
import Paper from 'material-ui/lib/paper';
let socket = io();


class DataVis extends Component {
  constructor() {
    super()
    this.state = {
      tablename: store.getState().buildTable.dataVisTable,
      data: {
        columns: [],
        name: '',
        children: []
      },
      username: JSON.parse(localStorage.getItem('sift-user')).username
    }
  }

  addNode(node) {
    // node = {
    //   values: {
    //     lastName: 'Brown'
    //   }
    // };
    
    node.tablename = this.state.tablename;
    node.username = this.state.username;
    socket.emit('add', node);
  }

  editNode(node) {
    // node = {
    //   rowId: String,
    //   values: {
    //     lastName: 'Erik Brown changed this.'
    //     all other key/value pairs
    //   }
    // };

    node.tablename = this.state.tablename;
    node.username = this.state.username;
    socket.emit('edit', node);
  }

  removeNode(rowId) {
    var node = {
      tablename: this.state.tablename,
      username: this.state.username,
      rowId: rowId
    }
    socket.emit('remove', node);
  }

  componentDidMount() {

    let username = this.state.username;
    let tablename = username + '_' + this.state.tablename;
    var emitmessage = 'update ' + tablename;

    h.loadTable(tablename, function(data) {
      this.setState({
        data: data
      });
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
    console.log('in datavis render: ', this.state.data)
    return (

        <div className="container">
          <AddNode columns={ this.state.data.columns } addNode={ this.addNode.bind(this) } />
          <Tree data={ this.state.data } removeNode={ this.removeNode.bind(this) } />
        </div>
    )
  }
}

export default DataVis
