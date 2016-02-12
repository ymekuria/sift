import React, { Component } from 'react'
import store from '../store.jsx'
import { getTables } from '../utils/utils'
import ApiInfo from './ApiInfo.jsx'
// Material UI components
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

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
  height: "80vh",
  overflowY: "scroll"
}

const infoListItem = {
  width: "900px",
  height: "170px",
  marginLeft: "30px",
  borderBottom: "1px solid black"
}

class Information extends Component {
  constructor() {
    super();

    this.state={
      info: {},
      userTables: {}
    }

  }

  componentWillMount() {
    let userObj = window.localStorage.getItem('sift-user');
    let username = JSON.parse(userObj).username;
  }

  render() {
    return (
     <ApiInfo></ApiInfo>
    )
  }
}




export default Information
