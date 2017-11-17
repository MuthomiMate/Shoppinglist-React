import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toaster from './sucessToaster'
import {toast} from 'react-toastify'
import axios from 'axios';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class Register extends Component {

    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick= (event)=>{
        event.preventDefault();
        var apiBaseUrl = 'https://shopping-list-api-muthomi.herokuapp.com/';
        var payload={
            "email":this.state.email,
            "password":this.state.password,
            "name": `${this.state.first_name}${this.state.last_name}`
        }
        axios.post(apiBaseUrl+'auth/register', payload)
            .then(function (response) {
                toast.success(response.data.message)
                 // this.props.history.push("/login")
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            });
    }
    render() {
        return (
            <div>
                <Toaster/>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <Card style = {{width: '40%', marginLeft: '30%', marginTop : '2%'}}>
                            <div style={{textAlign: "center"}}>
                                <CardHeader title = "Register"/>
                                <CardText>
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            id="fname"
                            onChange = {(event) => this.setState({first_name:event.target.value})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            id="lname"
                            onChange = {(event) => this.setState({last_name:event.target.value})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            id="email"
                            floatingLabelText="Email"
                            onChange = {(event) => this.setState({email:event.target.value})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            id="password"
                            floatingLabelText="Password"
                            onChange = {(event) => this.setState({password:event.target.value})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} id="submit" style={style} onClick={(event) => this.handleClick(event)}/>
                                </CardText></div>
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
export default Register;
