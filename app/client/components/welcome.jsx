import React, { Component } from 'react'


const style = {
  width: '500px',
  height: '500px',
  backgroundColor: 'green'
}

//in here we should render links to our signin pages


export const Welcome = () => {
  console.log('in welcome')
  return (<div 
    style={style}>
      <a>Link to the sandbox</a>
      <br/>
      <a>Link to signin</a>
      <br/>
      <a>Link to signup</a>
      <br/>
    this is our welcome page!
    </div>)
}