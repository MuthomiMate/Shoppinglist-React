import React, {Component} from 'react'
import MainNav from "./navbar";
import axios from 'axios'
import Toaster from './sucessToaster'
import {toast} from 'react-toastify'
import LoadingSpinner from './spinner'
 const  apiBaseUrl=`https://shopping-list-api-muthomi.herokuapp.com/auth/ccpas`
class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            newPassword: '',
            showspinner: false
        }
        this.changePass = this.changePass.bind(this)
    }
    changePass = (event) =>{
        this.setState({showspinner:true})
        event.preventDefault();
        let payload= {
            'old_password':this.state.password,
            'new_password':this.state.newPassword,
        }
        axios({
            method: 'PUT',
            url: apiBaseUrl,
            data: payload,
            headers: {
                Authorization: "Bearer "+window.localStorage.getItem('token'),
                content_type: 'application/json'
            }
        })
            .then((response) => {
            this.setState({showspinner:false})
                toast.success(response.data.message)
            })
            .catch((error) =>{
            this.setState({showspinner:false})
                toast.error(error.response.data.message)
            })
    }

    render() {
        return (
        <div>
            <MainNav/>
            <Toaster/>
            <div className=" col-lg-offset-4 col-md-4 ">
                <div className="panel panel-success">
                    <div className="panel-heading">change password</div>
                    <div className="panel-body">
                        <form onSubmit={this.changePass} >
                            {this.state.showspinner?<LoadingSpinner/>: ""}
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Old Password" id="password" required onChange={(event) =>this.setState({password:event.target.value})}/>
                            </div>
                            <div className='form-group'>
                                 <input type="password" className="form-control" placeholder="New Password" id="new_password" required onChange={(event) =>this.setState({newPassword:event.target.value})}/>
                            </div>
                            <div className="form-group">
                                 <input type="submit" className="btn btn-primary" value="Submit" id="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    )}
}
export default ChangePassword

