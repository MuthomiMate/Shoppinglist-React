import React, {Component} from 'react'
import axios from 'axios'
import {getToken, PromError, BaseUrl} from './helperfunctions'
import {toast} from 'react-toastify'
import * as ReactBootstrap from 'react-bootstrap'
import Toaster from './sucessToaster'

class DeleteShoppingList extends Component {
    constructor(){
        super()

    }

    deleteshoppinglist = () => {
        //function that handles the deletion of a shoppinglist
        axios({
            url: `${BaseUrl()}shoppinglists/`+this.props.id,
            method: 'DELETE',
            headers: {
                Authorization: getToken(),
                content_type: 'application/json',
            },
        })
            .then((response) =>{
                toast.success(response.data.message);
                this.props.parent.setState({shoppinglists:this.props.parent.state.shoppinglists.filter(shoppinglists => shoppinglists.id !== this.props.id )});
                console.log(this.props.parent.state);
            })
            .catch((error) =>{

                PromError(error, this);
            })

    };
    render(){
        return(
            <div>

                {/* delete modal  */}

                <div className="modal " id="deletes" role="dialog" data-backdrop="false">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <div className="modal-title text-center"> Delete shoppinglist</div>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div>
                                        <div><h4 className="text-center">Are you sure you want to Delete this
                                            Shopping list</h4></div>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ReactBootstrap.Button bsStyle="danger" data-dismiss="modal"
                                                       style={{float: "left", width: "150px"}}
                                                       onClick={this.deleteshoppinglist}>OK</ReactBootstrap.Button>
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" style={{
                                    float: "right",
                                    width: "150px"
                                }}>Cancel</ReactBootstrap.Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}export default DeleteShoppingList
