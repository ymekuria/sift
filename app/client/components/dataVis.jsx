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
var Select = require('react-select');
import {getTables} from '../utils/utils.js'


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
      username: JSON.parse(localStorage.getItem('sift-user')).username,
      allUserTables: ""
    }
  }

  addNode(node) {
    node.tablename = this.state.tablename;
    node.username = this.state.username;
    socket.emit('add', node);
  }

  updateValue (newValue) {
    this.setState({
      tablename: newValue
    });

    let username = JSON.parse(localStorage.getItem('sift-user')).username;
    let tablename = username + '_' + newValue;

    h.loadTable(tablename, function(data) {
      this.setState({
        data: data,
        updated: true
      });
    }.bind(this));
  }

  editNode(node) {
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


    var that = this;
    getTables(function(res){
      var filteredTableNames = [];
    _.each(res, function(i){
      var tempTable = i.tablename.split("_")[1]
      filteredTableNames.push({ value: tempTable, label: tempTable });
    });
        that.setState({
          allUserTables: filteredTableNames
        })
    });
    
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
      var updatedChildren = tabledata.children.filter(function(row) {
        return row.id !== data.old_val.id
      })
      tabledata.children = updatedChildren;

    // updating existing nodes
    } else {
      tabledata.children.each(function(row) {
        if (row.id === data.new_val.id) {
          row = h.formatData(data.new_val);
        }
      })
    }

    this.setState({
      data: tabledata
    })
  }

  render() {
    var options = this.state.allUserTables;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            Choose between your tables
            <Select ref="stateSelect" autofocus options={options} simpleValue name="selected-state" value={this.state.tablename} onChange={this.updateValue.bind(this)} />
          </div>
          <div className="col-md-5">
            <AddNode columns={ this.state.data.columns } addNode={ this.addNode.bind(this) } />
          </div>
        </div>
        <div className="col-md-7">
          <Tree data={ this.state.data } removeNode={ this.removeNode.bind(this) } />
        </div>
      </div>
    )
  }
}

export default DataVis
