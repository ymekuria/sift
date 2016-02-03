//creating our redux store
/*Routing*/
import routes from './config/routes.js'
import { Router, browserHistory} from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
/*Redux*/
import { createStore, combineReducers, applyMiddleware } from 'redux'
import buildTable  from './reducers/reducers.js'

const reducer = combineReducers({buildTable, routeReducer})


const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

const store = createStoreWithMiddleware(reducer)
//this is for use with the redux dev tools
// reduxRouterMiddleware.listenForReplays(store)

export default store