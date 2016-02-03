import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io();

class DataVis extends Component {
  constructor() {
    super()
    this.state={
      data: {}
    }
  }

  componentDidMount() {
    socket.on('server event', function (data) {
      console.log(data);
      socket.emit('client event', { socket: 'io' });
    });
  }

  render() {
    return(
      <div className='dataVis'></div>
    )
  }
}

export default DataVis