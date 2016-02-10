import React from 'react'



//db call helpers
//zen - 'https://api.github.com/zen'
export const createTable = (selections) => {
  //post data to db
  let url = '/api/users/tables'

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(selections)
  })
  .then((response) => response)
  .then((response) => {
    console.log('response: ', response)
  })
  .catch((err) => console.log(err));
}

const createCustomTable = (username, selections) => {
  //post data to db
  let url = '/api/users/tables';
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
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

export const getTables = (cb) => {
  //retrieve all table names for a specific user
  let url = '/api/users/tables'
  return fetch(url, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
    },
    body: {}
  })
  .then((response) => response.text())
  .then((text) => {
<<<<<<< HEAD
    console.log('inside get tables', text);
    cb(JSON.parse(text))
  })
}

const postToTable = (username, tableName, row) => {
  //api/postToTable:?usr=<username>
  //add a row to a users table
  let url = 'api/postToTable:?usr=' + username;
  return fetch(url, {
    credentials: 'same-origin',
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
    credentials: 'same-origin',
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
=======
    cb(JSON.parse(text))
>>>>>>> fixed api routes on front end so that it is based on paths vs. full URLs
  })
}

export const deleteTable = (tableId, cb) => {
  //api/deleteTable:?usr=<username>
<<<<<<< HEAD
  console.log('tableID in deletTabl ajax', tableId);
  let url = '/api/users/tables/' + tableId;
=======
  let url = 'api/users/tables/' + tableId;
>>>>>>> fixed api routes on front end so that it is based on paths vs. full URLs
  return fetch(url, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: {},
    body: {}
  })
  .then((response) => response.text())
  .then((text) => {
    cb();
  })
}
