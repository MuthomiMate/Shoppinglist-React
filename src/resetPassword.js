import React, {Component} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import Toaster from './sucessToaster'
import MainNav from "./navbar";
const apiBaseUrl=`https://shopping-list-api-muthomi.herokuapp.com/auth/passreset`
class PassReset extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
        this.ResetPass=this.ResetPass.bind(this)
    }

    ResetPass =(event)=>{
        event.preventDefault();
        let payload={
            'email': this.state.email
        }
        axios({
            method: 'PUT',
            url:apiBaseUrl,
            data: payload
        })
        .then((response)=>{
            console.log(response.data)
            toast.success(response.data.message)
        })
        .catch((error)=>{
            console.log(error.response)
            toast.error(error.response.data)
        })
    }
    render (){
        return(
            <div>
                {/*<MainNav/>*/}
                <Toaster/>
                <div className=" col-lg-offset-4 col-md-4 ">
                    <div className="panel panel-success">
                        <div className="panel-heading">Password Reset</div>
                        <div className="panel-body">
                            <form onSubmit={this.ResetPass}>
                                <div className="form-group">
                                    <input type="email" required className="form-control" placeholder="Enter your Email"onChange={(event)=>this.setState({email:event.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PassReset