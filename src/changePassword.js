import React, {Component} from 'react'
import MainNav from "./navbar";
import axios from 'axios'
import Toaster from './sucessToaster'
import {toast} from 'react-toastify'
 const  apiBaseUrl=`https://shopping-list-api-muthomi.herokuapp.com/auth/ccpas`
class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            newPassword: ''
        }
        this.changePass = this.changePass.bind(this)
    }
    changePass = (event) =>{
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
            console.log(response.data)
                if(response.data.mesage){
                    toast.success(response.data.mesage)
                }
                toast.success(response.data.message)
            })
            .catch((error) =>{
                console.log(error)
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
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Old Password" required onChange={(event) =>this.setState({password:event.target.value})}/>
                            </div>
                            <div className='form-group'>
                                 <input type="password" className="form-control" placeholder="New Password" required onChange={(event) =>this.setState({newPassword:event.target.value})}/>
                            </div>
                            <div className="form-group">
                                 <input type="submit" className="btn btn-primary" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    )}
}
export default ChangePassword

