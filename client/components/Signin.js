import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import fetch from 'whatwg-fetch';
import autobind from 'autobind-decorator';

// @autobind
class Signin extends Component {

  createLocalAccount(e) {
    e.preventDefault();

    var user = {
      displayName: this.refs.first.value + ' ' + this.refs.last.value,
      password: this.refs.password.value,
      email: this.refs.email.value
    }

    $.ajax({
      method: 'POST',
      url: 'http://localhost:5001/api/users',
      data: user
    })
    .done(function(response) {
      console.log('response: ', response)
    }) 
  }

  createGitHubUser(e) {
    console.log('clicked to sign in through GitHub');
  }
	
  render() {
    return (
      <div className='signin'>
       <button onClick={this.createGitHubUser}>Log In with GitHub</button>
       <span> -- OR -- </span>
       <form ref='userForm' onSubmit={this.createLocalAccount.bind(this)}>
         <input type='text' ref='first' placeholder='First Name' />
         <input type='text' ref='last' placeholder='Last Name' />
         <input type='email' ref='email' placeholder='Email Address' />
         <input type='password' ref='password' placeholder='Password' />
         <input type='password' ref='confirm' placeholder='Comfirm Password' />
         <button type='submit'>Create Account</button>
       </form>
      </div>
    );
  }
};

export default Signin;
