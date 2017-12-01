import React, { Component } from 'react';
import store from '../store.jsx';
import { getTables } from '../utils/utils';
import ApiInfo from './ApiInfo.jsx';
// Material UI components
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

class Information extends Component {
  constructor() {
    super();

    this.state = {
      info: {},
      userTables: {}
    };
  }

  componentWillMount() {
    let userObj = window.localStorage.getItem('sift-user');
    let username = JSON.parse(userObj).username;
  }

  render() {
    return <ApiInfo />;
  }
}

export default Information;
