import React, {Component} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import Toaster from './sucessToaster'
import NavLogin from './navlogin'
import LoadingSpinner from './spinner'
import {PromError,BaseUrl} from './helperfunctions'
class PassReset extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            showspinner: false
        }
        this.ResetPass=this.ResetPass.bind(this)
    }

    ResetPass =(event)=>{
        //function to handle reset password functionality
        this.setState({showspinner:true})
        event.preventDefault();
        let payload={
            'email': this.state.email
        }
        axios({
            method: 'PUT',
            url:`${BaseUrl()}auth/passreset`,
            data: payload
        })
        .then((response)=>{
            //executes if the response is successful
            this.setState({showspinner:false})
            console.log(response.data)
            toast.success(response.data.message)
        })
        .catch((error)=>{
            //handles promise errors
            this.setState({showspinner:false})
            PromError(error, this)
        })
    }
    render (){
        return(
            <div>
                <NavLogin/>
                <Toaster/>
                <div className=" col-lg-offset-4 col-md-4 ">
                    <div className="panel panel-success">
                        <div className="panel-heading">Password Reset</div>
                        <div className="panel-body">
                            <form onSubmit={this.ResetPass}>
                                <div className="form-group">
                                    <input type="email" required className="form-control" id="email" placeholder="Enter your Email"onChange={(event)=>this.setState({email:event.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="submit" className="btn btn-primary" id="button" />
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