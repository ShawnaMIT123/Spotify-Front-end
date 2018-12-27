import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

import reducer from './reducer';


 let store = createStore(reducer)


ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
<Provider store={store}><BrowserRouter>
     <App />
   </BrowserRouter></Provider>   </ActionCableProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
