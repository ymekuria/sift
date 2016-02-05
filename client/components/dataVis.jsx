import React, { Component } from 'react'
import h from '../config/helpers'
import io from 'socket.io-client'

const socket = io();

class DataVis extends Component {
  constructor() {
    super()
    this.state={
      data: []
    }
  }

  componentDidMount() {
    let tablename = this.state.tablename
    socket.on('update ' + tablename, function (data) {
      // if !new_val
        // delete old_val
      // if !old_val
        // add new_val as a new node
      // else
        // update old_val node with new_val node
    });
  }

  render() {
    return(
      <div className='dataVis'></div>
    )
  }
}

export default DataVis