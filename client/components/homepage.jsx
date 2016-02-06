import React, { Component } from 'react'
import _ from 'lodash';
import {getTables} from '../utils/utils.js'
import {deleteTable} from '../utils/utils.js'


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
    this.navigation = this.navigation.bind(this);
    this.renderDashTable =this.renderDashTable.bind(this);
  }
  
  componentWillMount() {
   // find a better way to bind this
    var that = this;
    console.log('that', that);
    getTables(function(res){
      that.setState({userTables: res})
      console.log('this.state', that.state)
    });
  
  }

  navigation(path) {
    
    console.log('path', path);
    store.dispatch(routeActions.push(path));
    console.log('this is the thing', this.context.store.getState())
  }


  renderDashTable(table) {
   
    return(
      <DashTable nav={this.navigation} table={table} index={table} />
      )
  }


  render() {
    
    return(
 
      <div className='container'>

          <DashBanner userName={this.state.userTables[0].tablename.split("_")[0].toUpperCase()}/>
       


        <div className='row'> 
                    <h4 className="col-md-2   ">
            CURRENT TABLES
          </h4> 
          <div className='col-md-12'>
           {/*pass in an object as props that has the table name and other relevant infor for the display*/}
           {_.map(this.state.userTables,this.renderDashTable)}     
           
           
          </div>    
        </div>
      </div>   
    )
  }
}

class DashTable extends Component {

  removeTable (tableID) {
    console.log('tableID', tableID);
    deleteTable(tableID);

  }  

  render() {
    const style = {
    height: 200,
    width: 200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'


  };
    const iconStyle = {
    marginLeft: 160,
     display: 'inline-block',
     
    
  };  
    const svgStyle = {
      fontSize: '10px',
       height: '10px',
        width: '1px'
    }
    return (
        <Paper style={style}  zDepth={5} rounded={false}>
          <IconButton onClick={()=>this.removeTable(this.props.table.id)} style={iconStyle}>
            <Delete style={svgStyle}/>
          </IconButton>
          <h5>{this.props.table.tablename.split("_")[1].toUpperCase()}</h5>
          <RaisedButton label="View Table" onClick={() => this.props.nav('/vis')} style={{margin: 5,
            position: 'relative',
           bottom: -50,
           

         }} />

       </Paper>

    ) 
  }
}


class DashButtons extends Component {

  render() {
    return (
      <div>
        <RaisedButton label="QuickStart"  style={{margin:12}} />
        <RaisedButton label="API Docs"  style={{margin:12}} />
        <RaisedButton label="Examples" style={{margin:12}} />
        <RaisedButton label="Fun"  style={{margin:12}} />
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
            WELCOME BACK TO SIFT {this.props.userName}
          </h2>
          <h4 className="col-md-4 col-md-offset-4 dashOneliner">
            
          </h4>     
      </div>
    {/*row for buttons*/}
      <div className='row'>
        <div className='col-md-6 col-md-offset-3'>
          
        </div>
      </div>
    </div> 
    )
  }
} 




































export default Homepage