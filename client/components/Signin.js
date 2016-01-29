import React, { Component } from 'react';
// import { Navigation } from 'react-router';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import reactMixin from 'react-mixin';
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

    console.log(user);

    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((resJSON) => {
      localStorage.setItem('sift-user', resJSON.token)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  createGitHubUser(e) {
    e.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/auth/github'
    })
    .done(function(res) {
      console.log(res)
      if (res.token) {
        localStorage.setItem('user', res.token);
        // this.transitionTo('homepage');
      }
    })
  }
	
  render() {
    return (
      <div className='signin'>
       <input type='button' onclick='location.href="/auth/github"'>Login with GitHub</input>
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

// reactMixin.onClass(Signin, Navigation)

export default Signin;
