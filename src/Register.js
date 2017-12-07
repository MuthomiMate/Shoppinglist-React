import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toaster from './sucessToaster'
import {toast} from 'react-toastify'
import axios from 'axios';
import LoadingSpinner from './spinner'
import NavLogin from './navlogin'
import {Card, CardHeader, CardText} from 'material-ui/Card';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            spinnershow: false
        }
    }
    handleClick = (event) => {
        //method that sends user request to api if user click on register button
        event.preventDefault();
        this.setState({spinnershow:true})
        var apiBaseUrl = 'https://shopping-list-api-muthomi.herokuapp.com/';
        var payload={
            "email":this.state.email,
            "password":this.state.password,
            "name": `${this.state.first_name}${this.state.last_name}`
        }
        axios.post(apiBaseUrl+'auth/register', payload)
            .then((response)=> {
                    console.log(response.data)
                    this.setState({spinnershow:false})
                //display successful registration on a toaster
                    toast.success(response.data.message)
                //redirect to login page if user registers successfully
                    this.props.history.push("/login")
            })
            .catch((error)=> {
                //set the state of spinner to false so as not to show
                this.setState({spinnershow:false})
                console.log(error.response)
                //display the error to the user
                toast.error(error.response.data.message)
            });
    }
    render() {
        return (
            <div>
                <Toaster/>
                <MuiThemeProvider>
                    <div>
                        <NavLogin/>
                        <Card style = {{width: '40%', marginLeft: '30%', marginTop : '2%'}}>
                            <div style={{textAlign: "center"}}>
                                <CardHeader title = "Register"/>
                                <CardText>
                                    {/*call method handleclick on onsubmit*/}
                        <form onSubmit={this.handleClick}>
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
                        <br/>{this.state.spinnershow ?
                            <center><LoadingSpinner/></center> :
                        <RaisedButton type="submit" label="Submit"  primary={true} id="submit" style={style} />}
                        </form>
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
