import React, { Component } from 'react'
import h from '../config/helpers'
import _ from 'underscore'
import dndTree from './dndTree.js'
import d3 from 'd3'
import $ from 'jquery'
import io from 'socket.io-client'
import store from '../store'
import AddNode from './AddNode'
let socket = io();


class DataVis extends Component {
  constructor() {
    super()
    this.state = {
      tablename: store.getState().buildTable.dataVisTable,
      data: {
        name: '',
        children: []
      },
      testData: "INSIDE TEST DATA"
    }
  }

  addNode(node) {
    // node = {
    //   values: {
    //     lastName: 'Brown'
    //   }
    // };

    node.tablename = this.state.tablename;
    node.username = JSON.parse(localStorage.getItem('sift-user')).username;
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
    node.username = JSON.parse(localStorage.getItem('sift-user')).username;
    socket.emit('edit', node);
  }

  removeNode(rowId) {
    // rowId = "433a7a25-0b17-4cee-90f5-9a1e53cba7ab"
console.log("REMOVED NODE",rowId);
    // var node = {
    //   tablename: this.state.tablename,
    //   username: JSON.parse(localStorage.getItem('sift-user')).username,
    //   rowId: rowId
    // }
    // socket.emit('remove', node);
  }
  componentDidMount() {
    // TODO: setState with tablename

    let username = JSON.parse(localStorage.getItem('sift-user')).username;
    let tablename = username + '_' + this.state.tablename;
    var emitmessage = 'update ' + tablename;

    h.loadTable("John_Hello", function(data) {
      this.setState({
        data: data
      });
      dndTree(this.state.data, this.removeNode);
    }.bind(this));

    socket.on(emitmessage, function(data) {
      this.handleData(data)
    }.bind(this));
    // console.log("TESTDATA :",this.state.testData);
  }

  componentDidUpdate() {
    // dndTree();
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

        <div>
        <div id="tree-container"></div>

        {/*<AddNode />*/}
        </div>
    )
  }
}

export default DataVis
