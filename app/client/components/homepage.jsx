import React, { Component } from 'react'
import _ from 'lodash';
import {getTables} from '../utils/utils.js'
import {deleteTable} from '../utils/utils.js'
import h from '../config/helpers'

// Material UI components
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import {router} from 'react-router'
import { routeActions } from 'react-router-redux'
//import { FontIcon, IconButton, LeftNav} from 'material-ui'
import store from '../store.jsx'

import Settings from 'material-ui/lib/svg-icons/action/settings'
import Delete from 'material-ui/lib/svg-icons/action/highlight-off'

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';

class Homepage extends Component {
  constructor() {
    super();

    this.state={
      info: {},
      userTables: {},
      tablesExist: '',
      userName: '',
      displayName: JSON.parse(localStorage.getItem('sift-user')).displayname || ''
    }

    this.navigation = this.navigation.bind(this);
    this.renderDashTable = this.renderDashTable.bind(this);
    this.removeTable = this.removeTable.bind(this);
  }

  componentWillMount() {
   // find a better way to bind this//use promises instead 
    var that = this;
    
    getTables(function(res){

      if(res[0] === undefined) {
        that.setState({tablesExist: false})
      } else {
        console.log('getables response', res)
        that.setState({userTables: res,
          tablesExist: true,
          userName: res[0].tablename.split("_")[0].toUpperCase() })
      
      }
      // console.log('this.state in componentWillMount', this.state.userTables);
    });
    // console.log('this.state in componentWillMount', this.state.userTables);
  }
  componentDidMount() {
    var user = localStorage.getItem('sift-user');
    if (!user) {
      h.setUser(function(dbUser) {
        dbUser = JSON.stringify(dbUser);
        localStorage.setItem('sift-user', dbUser);
        this.setState({
          displayName: dbUser.displayname
        })
      })
    }
    console.log('this.state.displayName in componentDidMount',this.state.userTables)
  }
  


  navigation(path) {
    store.dispatch(routeActions.push(path));
  }

  renderDashTable(table) {
    return(
      <DashTable nav={this.navigation} removeTable = {this.removeTable} table={table} index={table} />
    )
  }

  removeTable (tableID) {

    var that = this;
    // makes an ajax call to delete the clicked table from the db
    if (confirm("Are you sure want to delete all records of this table?") ) {
      deleteTable(tableID, function(){
        console.log('what is going on in this ')
        // makes a ajax call to update the state with the list of tables
        getTables(function(res){ 

          if(res[0] === undefined) {
            console.log('res in removetable', res)
            that.setState({tablesExist: false})
          } else {
            that.setState({userTables: res,
              tablesExist: true
            })
          }
        });
      });
     } 
 
  }  

  
  render() {
    if (this.state.tablesExist) {
    return(

      <div className='container'>
        <DashBanner userName={ this.state.displayName }/>
        <div className='row'> 
          <h4 className="col-md-2  ">CURRENT TABLES</h4>
        </div>   
        <div className ='row'>
          <div className='col-md-12'>
            <AddTables class={"addTableCard"}/> 
          { _.map(this.state.userTables, this.renderDashTable) } 
            
          </div>
          </div>    
        
      </div>   
    )

  } else {

  return(

    <div className='container'>
      <DashBanner userName={ this.state.displayName}/>
        <div className='row'> 
          <h4 className="col-md-2  ">CURRENT TABLES</h4> 
          <div className='col-md-12'>
            <AddTables className={''}nav={this.navigation}/>
          </div>    
        </div>
      </div>   
    )
  }
 }
}

class DashTable extends Component {

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
      display: 'inline-block'
    };  

    const svgStyle = {
      fontSize: '10px',
      height: '10px',
      width: '1px'
    }

    return ( 
        <Paper style={style}  zDepth={5} rounded={false}>
          <IconButton onClick={()=>this.props.removeTable(this.props.table.id)} style={iconStyle}>
            <Delete style={svgStyle}/>
          </IconButton>
          <h5>{this.props.table.tablename.split("_")[1].toUpperCase()}</h5>
          
          <RaisedButton 
          label="View Table" 
          onClick={() => {
            store.dispatch({type: 'adding_vis_table',
                              newTable: this.props.table.tablename.split("_")[1] })
            this.props.nav('/vis')}} 
          style={{margin: 5,
            position: 'relative',
           bottom: -50}} />

       </Paper>
    ) 
  }
}

class DashButtons extends Component {

  render() {
    return (
      <div>
        <RaisedButton label="QuickStart" style={{margin:12}} />
        <RaisedButton label="API Docs" style={{margin:12}} />
        <RaisedButton label="Examples" style={{margin:12}} />
        <RaisedButton label="Fun" style={{margin:12}} />
      </div>
    )
  }
}  

class DashBanner extends Component {

  render() {
    return (
    <div className='dashBanner'>
      <div className='row'>
        <h2 className="col-md-4 col-md-offset-3 " >
          Welcome back to SIFT, {this.props.userName}
        </h2>
        <h4 className="col-md-4 col-md-offset-4 dashOneliner"></h4>     
      </div>
    {/*row for buttons*/}
      <div className='row'>
        <div className='col-md-6 col-md-offset-3'></div>
      </div>
    </div> 
    )
  }
} 

class DeleteOption extends Component {

  render() {
    <div>are you sure?</div>
  }
}
class AddTables extends Component {
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
        <Paper className={this.props.class}  style={style}  zDepth={5} rounded={false}>
         
          <h5>WANT TO ADD A TABLE?</h5>
          
          <RaisedButton 
          label="Create Table" 
          onClick={() => {
          
            this.props.nav('/build')}} 
          style={{margin: 5,
            position: 'relative',
           bottom: -50, }} />

       </Paper>
    ) 
  }
}

export default Homepage

