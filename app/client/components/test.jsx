import React, { Component } from 'react'
import ReactDOM from 'react-dom';
var Select = require('react-select');

const STATES = require('../data/dataTypes.js');

var test = React.createClass({
	getDefaultProps () {
		return {
			label: 'Select a Data Type:',
		};
	},
	getInitialState () {
		return {
			country: 'dataTypes',
			dataValue: '',
      tableValue: '',
      columnValue: '',
			allColumns: {},
		};
	},

     ///////UPDATES DATA TYPE ///////
	updateValue (newValue) {
		this.setState({
			dataValue: newValue
		});
	},
	///////UPDATES TABLE NAME ///////
  updateTable (event) {
    this.setState({
      tableValue:  event.target.value
    });
  },
	///////UPDATES COLUMN NAME ///////
  updateColumn (event) {
    this.setState({
      columnValue: event.target.value
    });
  },

	focusStateSelect () {
		this.refs.stateSelect.focus();
	},

	addColumn (event) {
		var columns = this.state.allColumns;
		columns[this.state.columnValue] = this.state.dataValue;

		this.setState({
				allColumns: columns,
		});
	},
//REDUX
	// componentDidMount() {
  //   //subscribe to the store
  //   const { store } = this.context;
  //   console.log(store.getState());
	//
  //   this.unsubscribe = store.subscribe(() => {
  //     console.log('updatin disptachid');
  //     this.forceUpdate()
	// 	};
	//
	//
  //   var user = localStorage.getItem('sift-user');
  //   if (!user) {
  //     h.setUser(function(dbUser) {
  //       localStorage.setItem('sift-user', dbUser);
  //     })
  //   }
  // }
	//
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }
	//REDUX
	render () {
		var options = STATES[this.state.country];
		var columns = [];
		for (var key in this.state.allColumns ){
			columns.push("Name : "+ key +" Type: "+ this.state.allColumns[key] );
		}
		console.log(columns);

		const { country, dataValue, tableValue, columnValue, completeTable, allColumns } = this.context.store.getState().customTable;
		console.log(country, dataValue, tableValue, columnValue, completeTable, allColumns)
		return (

			<div className="section">
			<br></br><br></br>

			{/*//////CHOOSE A TABLE NAME////////*/}
      <input type="text" onChange={() => {store.dispatch({
				type: 'updateTable',
				newCategory: this.state.tableValue
			})}} value={this.state.tableValue}/>
      <h4>Name your table</h4>

			{/*//////CHOOSE A COLUMN NAME////////*/}
      <input type="text" onChange={() => {store.dispatch({
				type: 'updateColumn',
				newCategory: this.state.columnValue
			})}} value={this.state.columnValue}/>
      <h4>Name a column</h4>

			{/*//////CHOOSE A DATA TYPE////////*/}
			<h3 className="section-heading">{this.props.label}</h3>
			<Select ref="stateSelect" autofocus options={options} simpleValue name="selected-state" value={this.state.dataValue} onChange={() => {store.dispatch({
				type: 'updateValue',
				newCategory: this.state.dataValue
			})}} />
			<br></br>

 			{/*///////ADD COLUMN BUTTON////////*/}
			<div style={{ marginTop: 14 }}>
			<button type="button" onClick={() => {store.dispatch({
				type: 'addColumn',
			})}} >Add Column</button>
			</div>

			{/*////// LIST OF CREATED COLUMNS////////*/}
			<h5>Table Name :</h5>
			<div>{this.state.tableValue}</div>
			<h5>column Created :</h5>
			{columns.map(function(a){return <div>{a}</div>})}
			{/*//////CREATE TABLE BUTTON////////*/}
			<div style={{ marginTop: 14 }}>
				<button type="button" onClick={this.focusStateSelect}>Create table</button>
			</div>
			</div>
		);
	}
});

export default test
