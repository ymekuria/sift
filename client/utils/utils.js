import React from 'react'
// import request from 'request'

//db call helpers
//zen - 'https://api.github.com/zen'
export const createTable = (tableName, selections) => {
  //api/generateTable:?usr=<username>'
  //post data to db
  selections['tableName'] = tableName;

  let url = '/api/users/tables'
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(selections)
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  })
  .catch((err) => console.log(err));
}

export const getTable = (username, tableName) => {
  //api/getOneTable:?usrTable=<username_table>
  //api/getOneTable
  //gets a single table
  let url = 'http://localhost:5001/getOneTable:?usrTable=' + username_tableName;
  return fetch(url, {
    method: 'GET',
    headers: {},
    body: {}
  })
  .then((response) => response.text())
  .then((text) => {
    console.log('response',text);
  })
}

export const getTables = (cb) => {
  //api/getTables:?usr=<username>
  //retrieve all table names for a specific user
  // console.log('username', username);
  let url = 'http://localhost:5001/api/users/tables' 
  return fetch(url, {
    method: 'GET',
    headers: {}, 
    body: {}
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
    cb(JSON.parse(text));
  })
}

const postToTable = (username, tableName, row) => {
  //api/postToTable:?usr=<username>
  //add a row to a users table
  let url = 'api/postToTable:?usr=' + username;
  return fetch(url, {
    method: 'POST',
    headers: {},
    body: {}
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  })
}
const updateValue = (username, tableName, row) => {
  //api/updateValue:?usr=<username>
  //update a specific value
  let url = 'api/updateValue:?usr=' + username;
  return fetch(url, {
    method: 'PUT',
    headers: {},
    body: JSON.stringify({
      tableName: tableName,
      row: row
    })
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  })
}

export const deleteTable = (tableId,cb) => {
  //api/deleteTable:?usr=<username>
  console.log('tableID in deletTabl ajax', tableId);
  let url = 'http://localhost:5001/api/users/tables/' + tableId;
  return fetch(url, {
    method: 'DELETE',
    headers: {},
    body: {}
  })
  .then((response) => response.text())
  .then((text) => {
    cb();
    console.log(text);
  })
}

const deleteRow = (username, tableName, row) => {
  //api/deleteRow:?usr=<username>
  //delete a row
  let url = 'api/deleteRow:?usr=' + username;
  return fetch(url, {
    method: 'DELETE',
    headers: {},
    body: JSON.stringify({
      tableName: tableName
    })
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  })
}










