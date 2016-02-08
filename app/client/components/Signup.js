import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Signup extends Component {

  // signup() {
  //   var = user {
  //     first: this.refs.first,
  //     last: this.refs.last,
  //     email: this.refs.email,
  //     username: this.refs.email.replace(/[^a-zA-Z0-9 ]/g, ""),
  //     password: this.refs.password
  //   }

  //   fetch('/api/users', {
  //     method: 'POST'
  //   })
  //   .then(function(res) {

  //   })
  // }
	
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
