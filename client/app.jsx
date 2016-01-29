import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes.js'
import { Router, browserHistory } from 'react-router'
require('./css/style.css')


ReactDOM.render(<Router>{routes}</Router>,
	document.getElementById('root')
);
