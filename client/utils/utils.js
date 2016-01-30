import React from 'react'

//db call helpers
//zen - 'https://api.github.com/zen'
export const createTable = (username, selections) => {
  //api/generateTable:?usr=<username>'
  //post data to db
  let url = 'api/generateTable:?usr=' + username
  return fetch(url, {
    method: 'POST',
    headers: {},
    body: JSON.stringify(selections)
  })
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  })
}

const getTable = (username, tableName) => {
  //api/getOneTable:?usrTable=<username_table>
  //api/getOneTable
  //gets a single table
  let url = 'api/getOneTable:?usrTable=' + username_tableName;
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










