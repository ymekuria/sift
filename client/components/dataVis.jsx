import React, { Component } from 'react'
// import io from 'socket.io-client'

// const socket = io();

class DataVis extends Component {
  constructor() {
    super()
    this.state={
      data: []
    }
  }

  // componentDidMount() {
  //   // socket.on('data change', function (data) {
  //   //   this.setState({
  //   //     data: data
  //   //   })
  //   // });
  // }

  render() {
    return(
      <div className='dataVis'></div>
    )
  }
}

export default DataVis