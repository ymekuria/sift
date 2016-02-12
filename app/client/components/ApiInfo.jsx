import React, { Component } from 'react'

import RaisedButton from 'material-ui/lib/raised-button'
import Paper from 'material-ui/lib/paper'

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

const ApiInfo = () => {
  return (
  <div className='infoContainer'>
    <div className='infoHeader'>
      <RaisedButton style={apiInfoHeader}>
      API
      </RaisedButton>

      <RaisedButton style={apiInfoHeader}>
      GETTING STARTED
      </RaisedButton>

      <RaisedButton style={apiInfoHeader}>
      GUIDE
      </RaisedButton>
    </div>

    <Paper style={infoDisplay}>
      <div className='infoListItem' style={infoListItem}>
        <div className='itemContent'>
        <h2>Understanding the API</h2>
        <br/>
        Once you have created tables, you can begin
        interacting with your data with standard CRUD operations.
        Below, you will find each of the different operations, the
        API endpoint pattern to use, and the data that you can expect to
        recieve.
        </div>
      </div>
      <div className='infoListItem' style={infoListItem}>
        <div className='itemContent'>
          <h2>GET</h2>
          <h4>/sand/:tablename/:username</h4>
          This endpoint will get you all of the entries from a table that you have created.
          <br/>
          You can expect to recieve a JSON array - each array value being a single table entry.
        </div>
      </div>
      <div className='infoListItem' style={infoListItem}>
        <div className='itemContent'>
          <h2>POST</h2>
          <h4>/sand/:tablename/:username</h4>
          This endpoint will add an entry to an existing table.
          <br/>
          The request body should be a JSON object that represents the new entry.
          <br/>
          columnName: value
        </div>
      </div>
      <div className='infoListItem' style={infoListItem}>
        <div className='itemContent'>
        <h2>PUT</h2>
        <h4>/sand/:tablename/:rowId</h4>
        This endpoint will overwrite an entry to an existing table with a provided value.
        <br/>
        The request body should be a JSON object that includes the entry to be overwritten, and the new value.
        <br/>
        columnName: string, newValue: value
        </div>
      </div>
       <div className='infoListItem' style={infoListItem}>
        <div className='itemContent'>
        <h2>DELETE</h2>
        <h4>/sand/:tablename/:rowId</h4>
        This endpoint will delete an entry in an existing table.
        </div>
      </div>
    </Paper>
  </div>

  )
}
export default ApiInfo
