import React, { Component } from 'react'
import h from '../config/helpers'
import _ from 'underscore'
import showGraph from './dndTree.js'
import d3 from 'd3'
import $ from 'jquery'
import io from 'socket.io-client'
import store from '../store'
import AddNode from './AddNode'
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
      testData: "INSIDE TEST DATA",
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
      showGraph(this.state.data, this.removeNode.bind(this));
    }.bind(this));

    socket.on(emitmessage, function(data) {
      this.handleData(data)
    }.bind(this));
  }

  componentDidUpdate() {
    // $('#tree-container').empty();
    // this.componentDidMount();
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

        <div className="container">
          <div className="row">
            <div id="tree-container"></div>
            <AddNode />
            { /*<div className='col-md-3 endpoint'>
              API routes to manipulate your table<br />
              GET your table:<br />
              sift.ch/sand/{ this.state.username }/{ this.state.tablename }<br />
              POST to your table:<br />
              sift.ch/sand/{ this.state.username }/{ this.state.tablename }<br />
              PUT a value with a row ID:<br />
              sift.ch/sand/{ this.state.username }/{ this.state.tablename }/rowID<br />
              DELETE a value with a row ID:<br />
              sift.ch/sand/{ this.state.username }/{ this.state.tablename }/rowID<br />
            </div> */}
          </div>
        </div>
    )
  }
}

export default DataVis
