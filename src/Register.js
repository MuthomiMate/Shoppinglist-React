import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
class Register extends Component {
    handleClick(event){
        var apiBaseUrl = 'https://shopping-list-api-muthomi.herokuapp.com/';
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload={
            "email":this.state.email,
            "password":this.state.password
        }
        axios.post(apiBaseUrl+'auth/register', payload)
            .then(function (response) {
                console.log(response);
                    //  console.log("registration successfull");
                var result = response.data.message;
                if (result == 'You registered successfully. Please log in.'){
                    console.log(result);

                }else {
                    alert(result);
                }


            })
            .catch(function (error) {
                console.log(error);
                alert(error.response.data.message)
            });
    }
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
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
