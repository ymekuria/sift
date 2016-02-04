import React, { Component } from 'react'
import _ from 'lodash';
import {getTables} from '../utils/utils.js'


// Material UI components
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';


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
  
  componentDidMount() {
   // find a better way to bind this
    var that = this;
    getTables(function(res){
      that.setState({userTables: res})
      console.log('this.state', that.state)
    });
  
  }

  renderDashTable(table) {
    return(
      <DashTable tableName={table.tablename} index={table}/>
      )
  }

  render() {
    var testArr=['yoni', 'jon'];
    return(
      <div className='container-fluid'>
        <DashBanner/>

        <div className='row'> 
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


  render() {
    const style = {
    height: 200,
    width: 200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };
    return (
   
        <Paper style={style}  zDepth={5} rounded={false}>
            <h4>{this.props.tableName}</h4>
            <RaisedButton label="Manage App" style={{margin: 5}} />

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
            WELCOME TO SIFT
          </h2>
          <h4 className="col-md-4 col-md-offset-4 dashOneliner">
            A Simple Integrated Frontend Toolkit
          </h4>     
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




































export default Homepage