import React, { Component } from 'react';
//import logo from './logo.svg';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import MainNav from  './navbar.js'

import Loginscreen from './Loginscreen'
injectTapEventPlugin();

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[]
        }
    }
    componentWillMount(){
        var loginPage =[];
        loginPage.push(<Loginscreen parentContext={this}/>);
        this.setState({
            loginPage:loginPage
        })
    }
    render() {
        return (

            <div className="App">
                {this.state.loginPage}
                {this.state.uploadScreen}

            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default App;
