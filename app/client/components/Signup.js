import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Signup extends Component {

  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  localSignup(e) {
    e.preventDefault();

    let user = {
      first: this.refs.first.value,
      last: this.refs.last.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }

    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((res) => {
      if (res.status === 403) {
        return res.json()
      } else {
        window.location.assign('/signin')
      }
    })
    .then((json) => {
      if (json) {
        var message = json.message;
        this.setState({
          message: message
        })
      } else {
        next()
      }
    })
    .catch((err) => {
      console.log('Err: ', err)
    })
  }
	
  render() {
    return (
      <div className='signin'>
        <form action='/auth/github' method='get'>
          <button type='submit'>Sign up with GitHub</button>
        </form>
       <span> -- OR -- </span>
       { this.state.message }
       <form onSubmit={ this.localSignup.bind(this) }>
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
