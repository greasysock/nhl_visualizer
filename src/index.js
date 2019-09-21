import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import App from './App'
import reducers from './reducers'

// Setup Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Setup Redux Store
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))