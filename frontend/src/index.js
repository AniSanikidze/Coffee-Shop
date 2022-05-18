import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';
import {Provider} from 'react-redux'
import store from './reduxStore.js' 

import {positions,transitions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);