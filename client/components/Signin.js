import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Signin extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  signin(e) {
    e.preventDefault();

    let user = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }

    return fetch('/signin', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((res) => { return res.text(); })
    .then(function(json) {
      var user = JSON.stringify(json)
      localStorage.setItem('sift-user', user);
      window.location.assign('/build')
    })
    .catch((err) => {
      console.log('Err: ', err)
    })
  }
	
  render() {
    return (
      <div className='signin'>
        <form action='/auth/github' method='get'>
          <button type='submit'>Sign in with GitHub</button>
        </form>
       <span> -- OR -- </span>
       <form onSubmit={ this.signin.bind(this) }>
         <input type='email' ref='username' placeholder='email address' />
         <input type='password' ref='password' placeholder='password' />
         <button>Sign In</button>
       </form>
       <a href='#/signup'>Need an account?</a>
      </div>
    );
  }
};

export default Signin;
