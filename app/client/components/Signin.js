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
    };
  }

  localSignin(e) {
    e.preventDefault();

    let user = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };

    return fetch('/signin', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        return res.json();
      })
      .then(function(json) {
        var user = JSON.stringify(json);
        localStorage.setItem('sift-user', user);
        window.location.assign('/home');
      })
      .catch(err => {
        console.log('Err: ', err);
      });
  }

  render() {
    const { paperStyle, buttonStyle } = styles;
    
    return (
      <div className="signupBackground">
        <div className="col-md-4 col-md-offset-4 signinPaper">
          <Paper
            className="sigininContainer"
            style={style}
            zDepth={5}
            rounded={true}
          >
            <h2>SIGNIN</h2>
            <div className="form-group col-md-10 col-md-offset-1">
              <form action="/auth/github" method="get">
                <RaisedButton
                  type="submit"
                  secondary={true}
                  label="WITH GITHUB"
                  style={buttonStyle}
                />
              </form>
              <br />
              <span> -- OR -- </span>
              <form onSubmit={this.localSignin.bind(this)}>
                <input
                  className=" form-group form-control"
                  type="email"
                  ref="username"
                  placeholder="email address"
                />
                <input
                  className=" form-group form-control"
                  type="password"
                  ref="password"
                  placeholder="password"
                />
                <RaisedButton
                  secondary={true}
                  label="SIGNIN"
                  type="submit"
                  style={buttonStyle}
                />
              </form>
              <a href="/signup">Need an account?</a>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

styles = {
  paperStyle: {
    height: '400px',
    width: '300px',
    position: 'relative',
    left: '108px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'inline-block'
  },
  buttonStyle: {
    display: 'block',
    width: '60%',
    position: 'relative',
    left: '20%',
    color: 'blue',
    marginTop: '15'
  }
};

export default Signin;
