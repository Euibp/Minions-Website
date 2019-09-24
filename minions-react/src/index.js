import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './pages/home';

import uuid from 'uuid'

import {getCookie, setCookie} from './util/cookies'
import { BrowserRouter as Router } from "react-router-dom";

var tempUserToken = getCookie("userToken");
//setCookie("minions","",0);
if(tempUserToken === ""){
  setCookie("userToken",uuid.v1(),7);
}


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
