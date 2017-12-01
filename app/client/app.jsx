import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/*Routing*/
import routes from './config/routes.js';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

/*Redux*/
import { Provider } from 'react-redux';
import store from './store.jsx';

require('./css/style.css');

//this is for use with the redux dev tools
// reduxRouterMiddleware.listenForReplays(store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
