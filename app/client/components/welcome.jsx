import React, { Component } from 'react';

//in here we should render links to our signin pages

// export default Welcome

//in here we should render links to our signin pages

export const Welcome = () => {
  console.log('in welcome');
  return (
    <div style={style}>
      <a>Link to the sandbox</a>
      <br />
      <a>Link to signin</a>
      <br />
      <a>Link to signup</a>
      <br />
      this is our welcome page!
    </div>
  );
};

const style = {
  width: '500px',
  height: '500px',
  backgroundColor: 'green'
};
