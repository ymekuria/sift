import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/lib/paper';

class Signin extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  localSignin(e) {
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
    .then((res) => { return res.json(); })
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
            const style = {
    height: 400,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
 };
    return (
      <div className='signupBackground'>
        <div className='col-md-4 col-md-offset-4 signinPaper'>
          <Paper style={style}  zDepth={5} rounded={true}>
        <form action='/auth/github' method='get'>
          <RaisedButton type='submit'secondary={true} label="SIGIN WITH GITHUB" style={buttonStyle}></RaisedButton>
        </form>
       <span> -- OR -- </span>
       <form onSubmit={ this.localSignin.bind(this) }>
         <input type='email' ref='username' placeholder='email address' />
         <input type='password' ref='password' placeholder='password' />
         <button type='submit'>Sign In</button>
       </form>
       <a href='#/signup'>Need an account?</a>
        </Paper>
       </div>
      </div>
    );
  }
};

export default Signin;
