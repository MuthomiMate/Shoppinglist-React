import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import axios from 'axios';
import React, { Component } from 'react';
import {toast} from 'react-toastify'
import Toaster from './sucessToaster'
import LoadingSpinner from './spinner'
import NavLogin from './navlogin'
import  {PromError} from './helperfunctions'

class Login extends  Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            spinnershow: false

        }

    }
    render (){
        return (
            <div>
                <MuiThemeProvider>
                    <div>

                        <Toaster/>
                        <NavLogin/>

                            <Card style={{width: '40%', marginLeft: '30%', marginTop: '2%'}}>
                                <div style={{textAlign: "center"}}>
                                    <CardHeader title="Login"/>

                                        <CardText>
                                            {/*check if the state of the spinner is set*/}
                                            {this.state.spinnershow ?
                                            <center><LoadingSpinner/></center> : ""}
                                            <div>
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
                                                           onChange={(event) => this.setState({password: event.target.value})}/>
                                                <br/>
                                                <RaisedButton label="Submit" primary={true} id="btn" style={{marginTop: "10px"}}
                                                              onClick={this.handleClick}/>
                                                <div style={{marginTop: "10px"}}><p>Not Registered. Please <a href={'/'}>sign
                                                    up</a></p></div>
                                                <div style={{marginTop: "10px"}}><p><a href={'/passreset'}>forgot password?</a></p></div>
                                            </div>
                                        </CardText>

                                    </div>
                            </Card>


                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    handleClick = (event) => {
        //function to login user after clicking login
        event.preventDefault();
        this.setState({spinnershow:true})
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
            //set spinnershow to false after promise
                this.setState({spinnershow:false})
                toast.success(response.data.message)
                window.localStorage.setItem('token', response.data.access_token);
                window.localStorage.setItem('name', response.data.name);
                //redirect user to the dashboard if he logs in successfully
                this.props.history.push("/dashboard");


            })
            .catch((error) => {
            //set spinner false after promiose error
                this.setState({spinnershow:false})
                //call promise error function to handle all errors
                PromError(error, this)
            })
}

};
export default Login;
