import React, { Component } from 'react'
import _ from 'lodash';
import { getTables } from '../utils/utils'
import { deleteTable } from '../utils/utils'
import h from '../config/helpers'

import DashTable from './dashTable'

// Material UI components
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import { router } from 'react-router';
import { routeActions } from 'react-router-redux';
//import { FontIcon, IconButton, LeftNav} from 'material-ui'
import store from '../store.jsx';

import Settings from 'material-ui/lib/svg-icons/action/settings';
import Delete from 'material-ui/lib/svg-icons/action/highlight-off';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import swal from 'sweetalert';

require("../../node_modules/sweetalert/themes/google/google.css");

class Homepage extends Component {
  constructor() {
    super();

    this.state = {
      info: {},
      userTables: {
        active: [],
        inactive: []
      },
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
   console.log('inside Component will mount')
    var that = this;
    var tables = this.state.userTables;
    getTables((res) => { // res is an array of table objects
      if(res[0] === undefined) {
        conosle.log('inside componentWillMount')
        that.setState({ tablesExist: false })
      } else {
        _.each(res, (table) => {
          conosle.log('inside componentWillMount');
          if (table.active) {
            tables.active.push(table);
          } else {
            tables.inactive.push(table);
          }
        })
      }
      that.setState({
        userTables: tables,
        tablesExist: true,
        userName: res[0].tablename.split("_")[0].toUpperCase()
      })
    });
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
  }

  navigation(path) {
    store.dispatch(routeActions.push(path));
  }

  renderDashTable(table) {
    return(
      <DashTable nav={this.navigation} removeTable = {this.removeTable} displayName={this.state.displayName} table={table} index={table} />
    )
  }

  removeTable (tableID) {
    var that = this;

    var alertConfig = {
      title: "Are you sure?",
      text: "All records of this table will be deleted?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55 ",
      confirmButtonText: "Yes, do delete it!",
      closeOnConfirm: false
    };

    var alert = function() {
      deleteTable(tableID, function() {
        var tables = {
          active: [],
          inactive: []
        };

        // makes an ajax call to delete the clicked table from the db
        getTables(function(res) {

          if(res.length === 0) {
            console.log('test');
            that.setState({ tablesExist: false })
          } else {
            console.log('test');
            _.each(res, function(table) {
              if (table.active) {
                tables.active.push(table);
              } else {
                tables.inactive.push(table);
              }
            });
            console.log('this.state after delete',that.state)
          }

          that.setState({
            userTables: tables,
            tablesExist: true,
            userName: res[0].tablename.split("_")[0].toUpperCase()
          });
        });
        
        swal("Deleted!",
        "Your table has been deleted.",
        "success");
      });


    }
    // makes an ajax call to delete the clicked table from the db
    // if (confirm("Are you sure want to delete all records of this table?") ) {
    swal(alertConfig, alert)
  }

  render() {
    if (this.state.tablesExist) {
    return(

      <div className='container'>

        <div className='row dashTopBorder'>
          <h4 className="col-md-2  ">CURRENT TABLES</h4>
        </div>
        <div className ='row'>
          <div className='col-md-12'>

            <AddTables class={'addTableCard'} nav={ this.navigation } />
          { _.map(this.state.userTables.active, this.renderDashTable) }

          </div>
        </div>
      
      </div>   

    )

  } else {

  return(

    <div className='container'>

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

class AddTables extends Component {
  render() {
    const style = {
    height: '21.3em',
    width: '19em',
    margin: '1em',
    textAlign: 'center',
    display: 'inline-block',
     border: '2px dashed #C5CAD9',
    marginBottom: '10px'
      // backgroundColor: '#E7E8EF'


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
        <div className={'addTableCardEmpty '+this.props.class }  style={style}  zDepth={2} rounded={false}>
          <RaisedButton secondary={true}
            label="Create Table"
            onClick={() => {
              this.props.nav('/build')}}
              style={{margin: 5, position: 'relative', bottom: -234 }} />

       </div>
    )
  }
}

export default Homepage
