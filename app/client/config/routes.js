import React, { Component } from 'react';
import main from '../components/main';
import { Welcome } from '../components/welcome';
import Build from '../components/Build';

import { Landing } from '../landingPage/landingPage';
import dataEntry from '../components/DataEntry';
import Info from '../components/Info.jsx';
import homepage from '../components/homepage/Homepage.jsx';
import DataVis from '../components/DataVis.jsx';

import Signin from '../components/Signin';
import Signup from '../components/Signup';
import routes from '../config/routes.js';
// import test from '../components/test.jsx'
import { Route, IndexRoute } from 'react-router';
import { requireAuth } from '../auth/auth';

//authenticate all routes other than signin signup

//there is a require authentication function that takes
//a componenet and renders it conditionally

//we need to add that function and get the token
//registered in local storage on sign in
// <IndexRoute component={Landing}/> took out root path
export default (
  <Route path="/" component={main}>
    <Route path="signin" component={Signin} />
    <Route path="signup" component={Signup} />
    <Route path="home" component={requireAuth(homepage)} />
    <Route path="build" component={requireAuth(Build)} />
    <Route path="vis" component={requireAuth(dataVis)} />
    <Route path="info" component={Info} />
  </Route>
);
