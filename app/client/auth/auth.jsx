import React from 'react'
import { routeActions } from 'react-router-redux'
import store from '../store.jsx'


//here we are goin to be creating the function that will be used
//to conditionally render our view based on
//whether or not the user is authenticated


export function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {
    constructor() {
      super();
    }
    //the below logic relies on the token being in local
    //storage and being able to check it.
    componentWillMount() {
      //call check auth
    }
    componenetWillRecieveProps() {
      //call check auth when we rerender
    }

    checkAuth() {
      //check local storage

      /*
      below we are returning true by default - this 
      simulates being signed in.
      */
      return true;
    }
    navigation(path) {
      //navigating to our desired endpoint IF we are logged in
      store.dispatch(routeActions.push(path));
    }

    render () {
      return (
        <div>
          {
            this.checkAuth() ? <Component/> : this.navigation('/signup')
          }

        </div>
        
      )
    }
  } 


  return AuthenticatedComponent;
}