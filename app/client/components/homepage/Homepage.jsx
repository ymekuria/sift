import React, { Component } from 'react';
import _ from 'lodash';
import { getTables } from '../utils/utils';
import { deleteTable } from '../utils/utils';
import h from '../config/helpers';

import DashTable from './DashTable';
import AddTable from './AddTable';

// Material UI components


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

require('../../node_modules/sweetalert/themes/google/google.css');

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
      displayName:
        JSON.parse(localStorage.getItem('sift-user')).displayname || ''
    };

    this.navigation = this.navigation.bind(this);
    this.renderDashTable = this.renderDashTable.bind(this);
    this.removeTable = this.removeTable.bind(this);
  }

  componentWillMount() {
    // find a better way to bind this
    var that = this;
    var tables = this.state.userTables;
    getTables()
      .then(response => {
        if (response[0] === undefined) {
          that.setState({ tablesExist: false });
        } else {
          _.each(response, table => {
            if (table.active) {
              tables.active.push(table);
            } else {
              tables.inactive.push(table);
            }
          });
        }
        that.setState({
          userTables: tables,
          tablesExist: true,
          userName: response[0].tablename.split('_')[0].toUpperCase()
        });
      })
      .catch(err => console.log(error));
  }

  componentDidMount() {
    var user = localStorage.getItem('sift-user');
    if (!user) {
      h.setUser(function(dbUser) {
        dbUser = JSON.stringify(dbUser);
        localStorage.setItem('sift-user', dbUser);
        this.setState({
          displayName: dbUser.displayname
        });
      });
    }
  }

  navigation(path) {
    store.dispatch(routeActions.push(path));
  }

  renderDashTable(table) {
    return (
      <DashTable
        nav={this.navigation}
        removeTable={this.removeTable}
        displayName={this.state.displayName}
        table={table}
        index={table}
      />
    );
  }

  removeTable(tableID) {
    var that = this;

    var alertConfig = {
      title: 'Are you sure?',
      text: 'All records of this table will be deleted?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55 ',
      confirmButtonText: 'Yes, do delete it!',
      closeOnConfirm: false
    };

    var alert = function() {
      deleteTable(tableID, function() {
        var tables = {
          active: [],
          inactive: []
        };

        // makes an ajax call to delete the clicked table from the db
        getTables()
          .then(response => {
            if (response.length === 0) {
              that.setState({ tablesExist: false });
            } else {
              console.log('test');
              _.each(response, function(table) {
                if (table.active) {
                  tables.active.push(table);
                } else {
                  tables.inactive.push(table);
                }
              });
            }

            that.setState({
              userTables: tables,
              tablesExist: true,
              userName: response[0].tablename.split('_')[0].toUpperCase()
            });
          })
          .catch(error => console.log(error));

        swal('Deleted!', 'Your table has been deleted.', 'success');
      });
    };
    // makes an ajax call to delete the clicked table from the db
    // if (confirm("Are you sure want to delete all records of this table?") ) {
    swal(alertConfig, alert);
  }

  render() {
    if (this.state.tablesExist) {
      return (
        <div className="container">
          <div className="row dashTopBorder">
            <h4 className="col-md-2  ">CURRENT TABLES</h4>
          </div>
          <div className="row">
            <div className="col-md-12">
              <AddTables class={'addTableCard'} nav={this.navigation} />
              {_.map(this.state.userTables.active, this.renderDashTable)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <h4 className="col-md-2  ">CURRENT TABLES</h4>
            <div className="col-md-12">
              <AddTables className={''} nav={this.navigation} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Homepage;
