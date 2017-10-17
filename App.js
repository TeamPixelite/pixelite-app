/* global window */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'; // middleware
import { GOOGLE_FIREBASE_API_KEY } from './apis';
import reducers from './src/reducers'; // getting combined reducers
import Router from './src/Router';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(ReduxThunk),
));
/* eslint-enable */
class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: GOOGLE_FIREBASE_API_KEY,
      authDomain: 'manager-c381e.firebaseapp.com',
      databaseURL: 'https://manager-c381e.firebaseio.com',
      projectId: 'manager-c381e',
      storageBucket: '',
      messagingSenderId: '372117802073',
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
