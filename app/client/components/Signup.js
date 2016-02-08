import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

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
      'marginTop': '5'

    }; 

    return (

      <div className="signupBackground">
        <div className='col-md-4 col-md-offset-4 signinPaper'>
          <Paper style={style}  zDepth={5} rounded={true}>
            <form action='/auth/github' method='get'>
              <RaisedButton type='submit'style={buttonStyle}>Sign up with GitHub</RaisedButton>
            </form>

            <span> -- OR -- </span><br/>
              <form className ="form-group col-md-10 col-md-offset-1" action='/api/users' method='post'>
                   
                <input className =" form-control" type='text' ref='first' name='first' placeholder='First Name' /><br/>
                    
                <input className =" form-group form-control" type='text' ref='last' name='last' placeholder='Last Name' />
                 
                <input className =" form-group form-control" type='email' ref='email' name='email' placeholder='email address' />
                 
                <input className =" form-group form-control" type='password' ref='password' name='password' placeholder='password' />
                 
                <input className ="form-group form-control" type='password' ref='confomr' name='confirm' placeholder='Comfirm Password' />
                 <RaisedButton type='submit'style ={buttonStyle} >Sign Up</RaisedButton>
                <a href='#/signin'>Already have an account?</a>
           </form>





          </Paper>
        </div>  
      </div>  
    );
  }
};

export default Signup;
