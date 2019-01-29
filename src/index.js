import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../node_modules/materialize-css/dist/js/materialize.min.js';
import '../node_modules/nouislider/distribute/nouislider.min.js';
// import '../node_modules/nouislider/distribute/nouislider.min.css';
import './nouislider.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './helpers/jscolor.js'

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'));
  M.AutoInit();
  serviceWorker.unregister();  