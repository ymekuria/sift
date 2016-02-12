import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
var Select = require('react-select');
const STATES = require('../data/dataTypes.js').dataTypes;
import {createTable} from '../utils/utils.js'

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
		console.log('newValue', newValue);
		this.setState({
			dataValue: newValue
		});

		console.log('this.state.dataValue',this.state);

	}

	///////UPDATES TABLE NAME ///////
  updateTable (event) {
  	console.log('tableName', event.target.value)
    this.setState({
      tableValue:  event.target.value
    });
    console.log('TableValue State', this.state.tableValue)
  }

	///////UPDATES COLUMN NAME ///////
  updateColumn (event) {
  	console.log('columnName', event.target.value)
    this.setState({
      columnValue: event.target.value
    });
  }

	postTable () {
		//this.refs.stateSelect.focus();

		var selections = {
			tablename: this.state.tableValue,
            custom: true,
            columns: this.state.allColumns
          }

		console.log('selections', selections);
		console.log('this.state.allColumns', this.state.allColumns)
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
		var columns = [];
		for (var key in this.state.allColumns ){
			columns.push("Name : "+ key +" Type: "+ this.state.allColumns[key] );
		}

		return (

			<div className="section">
				<div>
		      <TextField hintText='Name your table' floatingLabelText='Tablename' onChange={this.updateTable.bind(this)} value={this.state.tableValue}/>
				</div>
				<div>
		      <TextField hintText='Name your column' floatingLabelText='Column name' onChange={this.updateColumn.bind(this)} value={this.state.columnValue}/>

					{/*//////CHOOSE A DATA TYPE////////*/}
					<h3 className="section-heading">{this.props.label}</h3>
					<Select ref="stateSelect" autofocus options={options} simpleValue name="selected-state" value={this.state.dataValue} onChange={this.updateValue.bind(this)} />
					<br></br>

		 			{/*///////ADD COLUMN BUTTON////////*/}
					<div style={{ marginTop: 14 }}>
					<button type="button" onClick={() => this.addColumn({
						type: 'addColumn',
					})} >Add Column</button>
					</div>

					{/*////// LIST OF CREATED COLUMNS////////*/}
					<h5>Table Name :</h5>
					<div>{this.state.tableValue}</div>
					<h5>column Created :</h5>
					{columns.map(function(a){return <div>{a}</div>})}
					{/*//////CREATE TABLE BUTTON////////*/}
					<div style={{ marginTop: 14 }}>
						<button type="button" onClick={this.postTable.bind(this)}>Create table</button>
					</div>
				</div>
			</div>
		);
	}

};

export default Custom
