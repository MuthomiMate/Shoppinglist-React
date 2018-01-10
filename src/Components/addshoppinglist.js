import React, {Component} from 'react'
import axios from 'axios'
import {getToken, PromError, BaseUrl} from './helperfunctions'
import {toast} from 'react-toastify'
import * as ReactBootstrap from 'react-bootstrap'

class AddShoppingList extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            showmodal: true
        }
    }


    addshoppinglist = () => {
       // this.setState({showmodal:false})
        //function to send requests to add a shopping list to the api
        //define the payload to be sent to the api
        let payload = {
            "name": this.state.name

        };
        axios({

            url: `${BaseUrl()}shoppinglists/`,
            method: 'post',
            data: payload,
            headers: {
                Authorization: getToken(),
                content_type: 'application/json',
            },
        })
            .then((response) => {
                //show success message if shopping list is added successfully
                toast.success("Shopping list has been added successfully");
                let newStateArray = this.props.parent.state.shoppinglists.slice();
                console.log(this.props.parent.state.shoppinglists);
                newStateArray.push(response.data);
                this.props.parent.setState({shoppinglists: newStateArray});
            })
            .catch((error) => {
                //call function to handle promise errors
                PromError(error, this)
            })
    };

    render(){
        return(
            <div>
                {/* add shopping list modal */}

                <div className="modal" id="adds" data-backdrop="false">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <div className="modal-title">Add a shoppinglist</div>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div className="form-group">
                                        <input className="form-control" type="text" id="name"
                                               placeholder="Enter shopping list Name"
                                               onChange={(event) => this.setState({name: event.target.value})}>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" id="shopadd"
                                                       style={{float: "left", width: "150px"}}
                                                       onClick={this.addshoppinglist}>Add</ReactBootstrap.Button>
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" style={{
                                    float: "right",
                                    width: "150px"
                                }}>çlose</ReactBootstrap.Button>
                            </div>
                        </div>
                    </div>

                </div>1
            </div>
        )
    }
}
export default AddShoppingList
