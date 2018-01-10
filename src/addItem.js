import React, {Component} from 'react'
import axios from 'axios'
import {getToken, PromError, BaseUrl} from './helperfunctions'
import {toast} from 'react-toastify'
import * as ReactBootstrap from 'react-bootstrap'

class AddItem extends Component {
    constructor() {
        super()
        this.state = {
            name: ""
        }

    }
    unmountComponent = ()=> {
        this.props.dismissComponent()
    }

    addItem = () => {
        //function to send the request for adding items
        //send name as payload for the request
        let payload = {
            'name': this.state.name
        };
        axios({
            //send tthe request
            url: `${BaseUrl()}shoppinglists/${this.props.id}/items/`,
            method: 'post',
            data: payload,
            headers: {
                Authorization: getToken(),
                content_type: 'application/json',
            }
        })
            .then((response) => {
                //request is successful
                //notify the user that the item has been added
                toast.success("Item has been added successfully")
                var newStateArray = this.props.parent.state.items.slice();
                newStateArray.push(response.data);
                this.props.parent.setState({items: newStateArray});
            })
            .catch((error) => {
                //request not successfull, call the promise error function
                PromError(error, this)
            })
    }


    render() {
        return (
            <div>
                <div className="modal " id="additem" role="dialog" data-backdrop="false">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <div className="modal-title">Add Item</div>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div className="form-group">
                                        <AddItemForm/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal"
                                                       style={{float: "left", width: "150px"}}
                                                       onClick={this.addItem}>Add</ReactBootstrap.Button>
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" style={{
                                    float: "right",
                                    width: "150px"
                                }}>çlose</ReactBootstrap.Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}export default AddItem

export class AddItemForm extends Component {
    render (){
        return(
            <div>
                <input className="form-control" type="text" id="name"
                       placeholder="Enter an item Name"
                       onChange={(event) => this.setState({name: event.target.value})}>
                </input>
            </div>
        )
    }
}
