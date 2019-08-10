import React, {Component} from 'react'
import axios from 'axios'
import {getToken, PromError, BaseUrl} from './helperfunctions'
import {toast} from 'react-toastify'
import * as ReactBootstrap from 'react-bootstrap'

class EditItem extends Component{
    constructor(){
        super()
    }

    editItem = () => {
        //function to edit a shopping list
        //send the new name as the payload
        let payload = {
            "name": this.state.name
        }
        axios({
            //send the request
            url: `${BaseUrl()}shoppinglists/items/${this.props.id}`,
            method: 'PUT',
            data: payload,
            headers: {
                Authorization: getToken(),
                content_type: 'application/json'
            }
        })
            .then((response) => {
                //request successful display success toaster
                console.log(response.data)
                toast.success("Item has been edited successfully")
                //remove the item before from items state
                this.props.parent.setState({items:this.props.parent.state.items.filter(items => items.id !== this.props.id )})
                var newStateArray = this.props.parent.state.items.slice();
                //add the edited item to the state
                newStateArray.push(response.data);
                this.props.parent.setState({items: newStateArray});
            })
            .catch((error) => {
                //request not successful, calls the promise errors function
                PromError(error, this)
            })

    }
    render (){
        return(
            <div>
                    {/*show edit item modal*/}
                <div className="modal " id="edititem" role="dialog" data-backdrop="false">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <div className="modal-title"> Edit this item</div>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div className="form-group">
                                        <input className="form-control" type="text" id="name"
                                               defaultValue={this.props.name}
                                               onChange={(event) => this.setState({name: event.target.value})}>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal"
                                                       style={{float: "left", width: "150px"}}
                                                       onClick={this.editItem}>Edit Item</ReactBootstrap.Button>
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
} export default EditItem
