import React, { Component } from 'react';
import { routeActions } from 'react-router-redux';
import router from 'react-router';
import Nav from './Nav';
import Homepage from './Homepage';
import store from '../store';

require('../css/style.css');

//this will be the top level app that renders everyting to root
class Main extends Component {
  inApplication() {
    //a helper to render our app based on location
    let location = this.props.location.pathname;
    if (
      location === '/' ||
      location === '/signup' ||
      location === '/signin' ||
      location === '/landing'
    ) {
      return false;
    }
    return true;
  }

  landingPage() {
    let location = this.props.location.pathname;
    if (location === '/') {
      store.dispatch(routeActions.push('/landing'));
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          {this.inApplication() ? <Nav /> : ''}
          {this.landingPage()}
        </div>
        <div className="routeContainer">{this.props.children}</div>
      </div>
    );
  }
}

export default Main;
