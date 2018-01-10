import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './Register'
import ShoppingItems from './shoppingItems'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from "./Login";
import Dashboard from "./dashboard"
import ChangePassword from "./changePassword"
import PassReset from "./resetPassword"
import ErrorPage from "./errorpage"
import LogoutComponent from "./logout"

ReactDOM.render(
<Router>
    <Switch>
        <Route exact path = "/" component ={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/logout" component={LogoutComponent}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/ccpass" component={ChangePassword}/>
        <Route exact path="/passreset" component={PassReset}/>
        <Route  exact path= {"/:id/items"} component={ShoppingItems}/>
        <Route exact path={"*"} component={ErrorPage}/>
    </Switch>
</Router>, document.getElementById('root'),
);
registerServiceWorker();
