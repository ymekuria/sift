import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import routes from './config/routes.js'
import { Router, browserHistory} from 'react-router'

/*Redux Dependencies*/
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

require('./css/style.css')


ReactDOM.render(<Router history={browserHistory}>{routes}</Router>,
	document.getElementById('root')
);
