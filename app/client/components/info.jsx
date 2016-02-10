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
import { getTables } from '../utils/utils'

const apiInfoHeader = {
  width: '30vw',
  height: '90px',
  marginRight: '2px',
  display: 'table',
  float: 'left',
  textAlign: 'center'

}
const infoDisplay = {
  width: "90vw",
  height: "500px",
  overflowY: "scroll"
}

const infoListItem = {
  width: "900px",
  height: "100px",
  margin: "4px auto"
}
const itemContent = {
  // width: "800px",
  // height: "80px",
  // display: "inline-block",
  // marginLeft: "65px",
}



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

  componentWillMount() {
    let userObj = window.localStorage.getItem('sift-user');
    let username = JSON.parse(userObj).username;
  }

  renderDashTable(table) {
   
    return(
      <DashTable nav={this.navigation} removeTable = {this.removeTable} table={table} index={table} />
      )
  }


  render() {
    
    return(
        <div className='infoContainer'> 
          <div className='infoHeader'>
            <RaisedButton style={apiInfoHeader}>
            API
            </RaisedButton>  

            <RaisedButton style={apiInfoHeader}>
            GETTING STARTED
            </RaisedButton> 

            <RaisedButton style={apiInfoHeader}>
            GUIDE
            </RaisedButton> 
          </div>

          <Paper style={infoDisplay}>
            <div className='infoListItem' style={infoListItem}>
              <div className='circle'>1</div>
              <div className='itemContent' style={itemContent}>
              <h4>Understanding the API</h4>
              sa;ldfkja;lsdkfjaslkdfjl;k
              as;dfjas;dklf
              <br/>
              a;sldkfj;alskdfj
              sa;ldfkja;lsdkfjaslkdfjl;k
              as;dfjas;dklf
              <br/>
              a;sldkfj;alskdfj
              sa;ldfkja;lsdkfjaslkdfjl;k
              as;dfjas;dklf
              <br/>
              a;sldkfj;alskdfj
              sa;ldfkja;lsdkfjaslkdfjl;k
              as;dfjas;dklf
              <br/>
              a;sldkfj;alskdfj
              
              </div>
            </div>
          </Paper>
        </div>
    )
  }
}




export default Information