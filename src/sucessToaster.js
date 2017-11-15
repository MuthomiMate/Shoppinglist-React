import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from 'react-toastify';
class Toaster extends Component{
    render(){
        return(
            <ToastContainer
                position="top-right"
                type="default"
                autoClose={5000}
                hideProgressBar={true}
                closeOnClick
            />
        )
    }
}
export default Toaster
