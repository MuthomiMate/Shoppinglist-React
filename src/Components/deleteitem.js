import React, {Component} from 'react'
import axios from 'axios'
import {getToken, PromError, BaseUrl} from './helperfunctions'
import {toast} from 'react-toastify'
import * as ReactBootstrap from 'react-bootstrap'

class DeleteItem extends Component {
    constructor(){
        super()
    }

    deleteItem = () => {
        //function to delete an item
        axios({
            //send the request
            url: `${BaseUrl()}shoppinglists/items/${this.props.id}`,
            method: 'DELETE',
            headers: {
                Authorization: getToken(),
                content_type: 'application/json'
            }
        })
            .then((response) => {
                //request successfull
                toast.success(response.data.message)
                //remove the deleted shopping list from the state
                this.props.parent.setState({items:this.props.parent.state.items.filter(items => items.id !== this.props.id )})
            })
            .catch((error) => {
                //request not successful
                //call the promise error function
                PromError(error, this)
            })

    }
    render (){
        return(
            <div>
                <div className="modal " id="deleteitem" role="dialog" data-backdrop="false">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <div className="modal-title text-center"> Delete Item</div>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div>
                                        <div><h4 className="text-center">Are you sure you want to Delete this
                                            Item</h4></div>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ReactBootstrap.Button bsStyle="danger" data-dismiss="modal"
                                                       style={{float: "left", width: "150px"}}
                                                       onClick={this.deleteItem}>OK</ReactBootstrap.Button>
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" style={{
                                    float: "right",
                                    width: "150px"
                                }}>Cancel</ReactBootstrap.Button>
                            </div>
                        </div>
                    </div>

                </div></div>
        )
    }
}export default DeleteItem