import './index.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './components/main';
import store from './store'

window.onbeforeunload = function(event) { console.log('UMOUNTUMOUNTUMOUNTUMOUNTUMOUNTUMOUNTUMOUNTUMOUNTUMOUNTUMOUNTUMOUNTUMOUNT'); };
ReactDOM.render(
    <Provider store ={store}>
        <Router>
         <Main />
        </Router>
        </Provider>,
    document.getElementById('app')
); 
