import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './Register'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from "./Login";
import Dashboard from "./dashboard"

ReactDOM.render(
<Router>
    <Switch>
        <Route exact path = "/" component ={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
    </Switch>
</Router>, document.getElementById('root'),
);
registerServiceWorker();
