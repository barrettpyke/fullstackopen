import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import RoutesList from './components/RoutesList'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <RoutesList />
    </Provider>
  </Router>,
 document.getElementById('root')
 );
