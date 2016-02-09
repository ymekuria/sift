import React, { Component } from 'react'
import main from '../components/main.jsx'
import { Welcome } from '../components/welcome.jsx'
<<<<<<< 2d135d6fc7a49ef31e2239089c6a037f5df84131
import Build from '../components/Build.jsx'
=======
import { Landing } from '../landingPage/landingPage.jsx'
import dataEntry from '../components/createData.jsx'
>>>>>>> added landing page, styled signup, and added placeholder for no usertables on homepage
import Info from '../components/info.jsx'
import homepage from '../components/homepage.jsx'
import dataVis from '../components/dataVis.jsx'

import Signin from '../components/Signin'
import Signup from '../components/Signup'
import routes from '../config/routes.js'
// import test from '../components/test.jsx'
import { Route, IndexRoute } from 'react-router'
import { requireAuth } from '../auth/auth'


//authenticate all routes other than signin signup

//there is a require authentication function that takes
//a componenet and renders it conditionally

//we need to add that function and get the token
//registered in local storage on sign in

export default (
  <Route path='/' component={main}>
    <IndexRoute component={Landing}/>
    <Route path='signin' component={Signin}/>
    <Route path='signup' component={Signup}/>
    <Route path='home' component={requireAuth(homepage)}/>
    <Route path='build' component={requireAuth(Build)}/>
    <Route path='vis' component={requireAuth(dataVis)}/>
    <Route path='info' component={Info}/>
  </Route>
)





/*
export default (
  <Route path='/' component={App}>
    <Route path='signin' component={Signin}/>
    <Route path='signup' component={Signup}/>
    <Route path='home' component={homepage}/>
<<<<<<< b40782af99be5f95cab3a2dfdb43b0db7fd7980f

    <Route path='home' component={requireAuth(homepage)}/>
    <Route path='build' component={requireAuth(dataEntry)}/>
    <Route path='vis' component={requireAuth(dataVis)}/>
  </Route>
)

*/
