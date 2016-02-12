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
    return response;
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
    console.log('inside get tables', text);
    cb(JSON.parse(text))
  })
}

export const deleteTable = (tableId, cb) => {
  //api/deleteTable:?usr=<username>
  let url = '/api/users/tables/' + tableId;
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
