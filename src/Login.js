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
    handleClick = (event) => {
        var apiBaseUrl = 'https://shopping-list-api-muthomi.herokuapp.com/';
        var payload={
            "email":this.state.email,
            "password":this.state.password
        };

        axios.post(apiBaseUrl + 'auth/login', payload)
            .then((response) => {
            if (response.data.message == "You logged in successfully."){
                console.log(payload);
                window.localStorage.setItem('token', response.data.access_token);
                window.localStorage.setItem('name', response.data.name);
                this.props.history.push("/dashboard");
            }else{
                console.log(response.data)
                this.props.history.push("/login");
            }




            })
            .catch((error) => {
                // console.log(error.response);
                // if (error.response){
                //     alert(error.response.data.message)
                // }
                // this.props.history.push("/dashboard");
                this.props.history.push("/login");
            });
    }
}
const style = {
    margin: 15,
};
export default Login;
