import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import axios from 'axios';
import React, { Component } from 'react';
import {toast} from 'react-toastify'
import Toaster from './sucessToaster'

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
                        <Toaster/>
                        {/*<AppBar title="Login" style={{backgroundColor: '#2196F3'}}/>*/}

                        <Card style = {{width: '40%', marginLeft: '30%', marginTop : '2%'}}>
                            <div style={{textAlign: "center"}}>
                            <CardHeader title = "Login"/>
                            <CardText>
                        <TextField
                        hintText="Enter Your Email"
                        type='email'
                        id='email'
                        floatingLabelText="Email"
                        onChange={(event) => this.setState({email: event.target.value})}/><br/>
                        <TextField hintText="Enter your password"
                                   type='password'
                                   id='password'
                        floatingLabelText="Password"
                        onChange={(event) => this.setState({password:event.target.value})}/>
                        <br/>
                        <RaisedButton label="Submit" primary={true} id="btn" style={{marginTop: "10px"}} onClick={this.handleClick}/>
                                <div style={{marginTop: "10px"}}><p>Not Registered. Please <a href={'/'}>sign up</a> </p></div>
                                <div style={{marginTop: "10px"}}><p> <a href={'/'}>forgot password?</a> </p></div>
                            </CardText></div>
                        </Card>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    handleClick = (event) => {
        event.preventDefault();
        var apiBaseUrl = 'https://shopping-list-api-muthomi.herokuapp.com/auth/login';
        var payload={
            "email":this.state.email,
            "password":this.state.password
        };
        axios({
            method: 'post',
            data: payload,
            url: apiBaseUrl,
        })
            .then((response) =>{
                toast.success(response.data.message)
                window.localStorage.setItem('token', response.data.access_token);
                window.localStorage.setItem('name', response.data.name);
                this.props.history.push("/dashboard");
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
}

};
export default Login;
