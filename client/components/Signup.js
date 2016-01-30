import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Signup extends Component {

  createLocalAccount(e) {
    e.preventDefault();

    var user = {
      displayName: this.refs.first.value + ' ' + this.refs.last.value,
      password: this.refs.password.value,
      email: this.refs.email.value
    }
  }
	
  render() {
    return (
      <div className='signin'>
        <form action='/auth/github' method='get'>
          <button type='submit'>Sign up with GitHub</button>
        </form>
       <span> -- OR -- </span>
       <form action='/api/users' method='post'>
         <input type='text' name='first' placeholder='First Name' />
         <input type='text' name='last' placeholder='Last Name' />
         <input type='email' name='email' placeholder='email address' />
         <input type='password' name='password' placeholder='password' />
         <input type='password' name='confirm' placeholder='Comfirm Password' />
         <button type='submit'>Create Account</button>
       </form>
      </div>
    );
  }
};

export default Signup;
