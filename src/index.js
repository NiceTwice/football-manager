import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
    , document.getElementById('root'));
registerServiceWorker();
