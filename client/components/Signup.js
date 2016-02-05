import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Signup extends Component {
	
  render() {
    return (
      <div className='signin'>
        <form action='/auth/github' method='get'>
          <button type='submit'>Sign up with GitHub</button>
        </form>
       <span> -- OR -- </span>
       <form action='/api/users' method='post'>
         <input type='text' ref='first' name='first' placeholder='First Name' />
         <input type='text' ref='last' name='last' placeholder='Last Name' />
         <input type='email' ref='email' name='email' placeholder='email address' />
         <input type='password' ref='password' name='password' placeholder='password' />
         <input type='password' ref='confomr' name='confirm' placeholder='Comfirm Password' />
         <button type='submit'>Sign Up</button>
         <a href='#/signin'>Already have an account?</a>
       </form>
      </div>
    );
  }
};

export default Signup;
