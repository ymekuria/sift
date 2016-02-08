import React, { Component } from 'react'
import _ from 'lodash';


// Material UI components
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';




import {router} from 'react-router'
import { routeActions } from 'react-router-redux'
//import { FontIcon, IconButton, LeftNav} from 'material-ui'
import store from '../store.jsx'

import Build from 'material-ui/lib/svg-icons/action/build'
import Stats from 'material-ui/lib/svg-icons/action/assessment'
import Info from 'material-ui/lib/svg-icons/action/info'
import Home from 'material-ui/lib/svg-icons/action/home'
import Settings from 'material-ui/lib/svg-icons/action/settings'
import Delete from 'material-ui/lib/svg-icons/action/highlight-off'

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';




class Information extends Component {
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
  

  renderDashTable(table) {
   
    return(
      <DashTable nav={this.navigation} removeTable = {this.removeTable} table={table} index={table} />
      )
  }


  render() {
    
    return(
 
      <div className='container'>

          <DashBanner />

        <div className='row'> 
                    <h4 className="col-md-2   ">
            DOCUMENTATION
          </h4> 
          <div className='col-md-12'>
              
           
           
          </div>    
        </div>
      </div>   
    )
  }
}




class DashButtons extends Component {

  render() {
    return (
      <div>
        <RaisedButton label="API Docs"  style={{margin:12}} />
        <RaisedButton label="Examples"  style={{margin:12}} />
        <RaisedButton label="Quickstart" style={{margin:12}} />
      
      </div>
    )
  }
}  

class DashBanner extends Component {

  render() {
    return (
    <div className='dashBanner'>
      <div className='row'>
          <h2 className="col-md-4 col-md-offset-4 " >
            SIFT
          </h2>
          <h3 className="col-md-3 col-md-offset-3 text-center ">
          Developer Docs
            
          </h3>    

      </div>
    {/*row for buttons*/}
      <div className='row'>
        <div className='col-md-6 col-md-offset-3'>
        <DashButtons/> 
          
        </div>
      </div>
    </div> 
    )
  }
} 



export default Information