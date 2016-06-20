import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field'
import { createTable } from '../utils/utils.js'
import { Paper } from 'material-ui'
import _ from 'lodash'

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const Select = require('react-select');
const STATES = require('../data/dataTypes.js').dataTypes;

const customContainer = {
  width: '90vw',
  height: '60vh',
}

class Custom extends Component {

	getDefaultProps () {
		return {
			label: 'Select a Data Type:',
		};
	}

	constructor () {
		super();
		this.state = {
			country: STATES,
			dataValue: '',
      tableValue: '',
      columnValue: '',
			allColumns: {},
		};
	}

  ///////UPDATES DATA TYPE ///////
	updateValue (newValue) {
		this.setState({
			dataValue: newValue
		});
	}

	///////UPDATES TABLE NAME ///////
  updateTable (event) {
    this.setState({
      tableValue:  event.target.value
    });
  }

	///////UPDATES COLUMN NAME ///////
  updateColumn (event) {
    this.setState({
      columnValue: event.target.value
    });
  }

	postTable () {
		var selections = {
			tablename: this.state.tableValue,
            custom: true,
            columns: this.state.allColumns
          }
		createTable(selections)
	}

	addColumn (event) {
		var columns = this.state.allColumns;
		columns[this.state.columnValue] = this.state.dataValue;

		this.setState({
		  allColumns: columns,
		});

	}

	render () {
		var options = this.state.country;
		var columns = this.state.allColumns;
    console.log(columns)


		return (

			<div className="section custom ">
        <Paper style={customContainer}>
        <div className='customChoose'>
  				<div>
  		      <TextField hintText='Name your table' floatingLabelText='Tablename' onChange={this.updateTable.bind(this)} value={this.state.tableValue}/>
  				</div>
  				<div>
  		      <TextField hintText='Name your column' floatingLabelText='Column name' onChange={this.updateColumn.bind(this)} value={this.state.columnValue}/>

  					{/*//////CHOOSE A DATA TYPE////////*/}
  					<h3 className="section-heading">{this.props.label}</h3>
  					<Select className='customDropdown' placeholder='Data Type' ref="stateSelect" autofocus options={options} simpleValue name="selected-state" value={this.state.dataValue} onChange={this.updateValue.bind(this)} />
  					<br></br>

  		 			{/*///////ADD COLUMN BUTTON////////*/}
  					<div>
  					<button type="button" onClick={() => this.addColumn({
  						type: 'addColumn',
  					})} >Add Column</button>
  					</div>
          </div>
        </div>

  			{/*////// LIST OF CREATED COLUMNS////////*/}
        <div className='customSelections clearfix'>
          <Table className='customTableDisplay'>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Data Type</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
  					{_.map(columns, function (col, val) { 
              return (
                <TableRow>
                <TableRowColumn>{val}</TableRowColumn>
                <TableRowColumn>{col}</TableRowColumn>
                </TableRow>
              ) 
            })}
          </TableBody>
          </Table>
					{/*//////CREATE TABLE BUTTON////////*/}
					<div style={{ marginTop: 14 }}>
						<button type="button" onClick={this.postTable.bind(this)}>Create table</button>
					</div>
        </div>
        </Paper>
			</div>
		);
	}

};

export default Custom
