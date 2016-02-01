import React from 'react'
// import request from 'request'

//db call helpers
//zen - 'https://api.github.com/zen'
export const createTable = (username, selections) => {
  //api/generateTable:?usr=<username>'
  //post data to db
  let url = 'http://localhost:5001/api/generateTable:?usr=' + username
   console.log('URL', url)
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selections)
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  })
  .catch((err) => console.log(err));
}

const getTable = (username, tableName) => {
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
    console.log(text);
  })
}

const getTables = (username) => {
  //api/getTables:?usr=<username>
  //retrieve all table names for a specific user
  let url = 'api/getTables:?usr=' + username;
  return fetch(url, {
    method: 'GET',
    headers: {},
    body: {}
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
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

const deleteTable = (username, tableName) => {
  //api/deleteTable:?usr=<username>
  //delete a table
  let url = 'api/deleteTable:?usr=' + username;
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









