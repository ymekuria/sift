import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Signin extends Component {
	
  render() {
    return (
      <div className='signin'>
        <form action='/auth/github' method='get'>
          <button type='submit'>Sign up with GitHub</button>
        </form>
       <span> -- OR -- </span>
       <form action='/signin' method='post'>
         <input type='email' name='username' placeholder='email address' />
         <input type='password' name='password' placeholder='password' />
         <button type='submit'>Sign In</button>
       </form>
      </div>
    );
  }
};

export default Signin;
