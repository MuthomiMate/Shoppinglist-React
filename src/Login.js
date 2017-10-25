import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as ReactBootstrap from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

class Login extends  Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""

        }

    }
    render (){
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login" style={{backgroundColor: '#2196F3'}}/>

                        <Card style = {{width: '40%', marginLeft: '30%', marginTop : '2%'}}>
                            <CardHeader title = "Login"/>
                            <CardText>
                        <TextField
                        hintText="Enter Your Email"
                        type='email'
                        floatingLabelText="Email"
                        onChange={(event, newValue) => this.setState({email: newValue})}/><br/>
                        <TextField hintText="Enter your password"
                                   type='password'
                        floatingLabelText="Password"
                        onChange={(event, newValue) => this.setState({password:newValue})}/>
                        <br/>
                                <ReactBootstrap.Button bsStyle="success">Primary</ReactBootstrap.Button>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleClick}/>
                            </CardText>
                        </Card>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    
}
const style = {
    margin: 15,
};
export default Login;
