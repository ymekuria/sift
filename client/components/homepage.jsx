import React, { Component } from 'react'



class Homepage extends Component {
  constructor() {
    super();

    //initialize userTables request to
    //user table
    //render a spinner while we are 
    //getting the tables
    this.state={
      info: {},
      userTables: {}
    }
  }


  render() {
    return(
      <div className='homepage'>
        <div className='banner'>
          WELCOME TO SIFT
          <br/>
          INSERT COOL BANNER HERE
          RENDER USER TABLES
        </div>
        <div className='homeTableDisplay'>
          DISPLAY USER TABLES HERE
        </div>
      </div>
    )
  }
}



export default Homepage