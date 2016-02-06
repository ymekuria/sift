import React, { Component } from 'react'
import h from '../config/helpers'
import io from 'socket.io-client'

let socket = io();

class DataVis extends Component {
  constructor() {
    super()
    this.state={
      tablename: 'newTable',
      data: []
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
    socket.emit('edit', node);
  }

  removeNode(node) {
    socket.emit('remove', node);
  }

  componentDidMount() {
    // TODO: setState with tablename
    let username = JSON.parse(localStorage.getItem('sift-user')).username;
    let tablename = username + '_' + this.state.tablename;
    var emitmessage = 'update ' + tablename;
    
    socket.on(emitmessage, function(data) {
      console.log(data);
      console.log('I heard you.')
    });

    h.loadTable(tablename, function(data) {
      this.setState({
        data: data }
        );
    }.bind(this));


    // function (data) {
    //   console.log('I heard that update!')
    //   // if !new_val
    //   // if (!data.new_val) {
    //   //   // delete data.old_val from data
    //   //   // this.state.data.push(data);
    //   // // if !old_val
    //   // } else if (!data.old_val) {
    //   //   // add new_val as a new node

    //   // // else
    //   // } else {
    //   //   // update old_val node with new_val node
        
    //   // }
    // });
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