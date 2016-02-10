import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

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
      window.location.assign('/home')
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
     const buttonStyle = {
      'display':'block',
      'width':'60%',
      'position':'relative',
      'left': '20%',
      'color': 'blue',
      'marginTop': '15'

    };
    return (
      <div className='signupBackground'>
        <div className='col-md-4 col-md-offset-4 signinPaper'>
          <Paper style={style}  zDepth={5} rounded={true}>
            <h2>SIGNIN</h2>
          <div className ="form-group col-md-10 col-md-offset-1">
            <form  action='/auth/github' method='get'>
             <RaisedButton type='submit'secondary={true} label="WITH GITHUB" style={buttonStyle}></RaisedButton>
            </form>
            <br/>
            <span> -- OR -- </span>
            <form onSubmit={ this.localSignin.bind(this) }>
              <input className =" form-group form-control" type='email' ref='username' placeholder='email address' />
              <input className =" form-group form-control" type='password' ref='password' placeholder='password' />
              <RaisedButton secondary={true} label = 'SIGNIN' type='submit'style ={buttonStyle} ></RaisedButton>
            </form>
       <a href='/signup'>Need an account?</a>
       </div>
        </Paper>
       </div>
      </div>
    );
  }
};

export default Signin;
