import React, {Component} from 'react'
import axios from 'axios'
import {getToken, PromError, BaseUrl} from './helperfunctions'
import {toast} from 'react-toastify'
import * as ReactBootstrap from 'react-bootstrap'

class EditShoppingList extends Component {
    constructor(){
        super()
        this.state = {
            name: "name"
        }
    }
    editshoppinglist = () => {
        //function that edits the shopping lists
        let payload = {
            "name": this.state.name
        };
        console.log(payload);
        axios({
            url: `${BaseUrl()}shoppinglists/`+this.props.id,
            method: 'PUT',
            data: payload,
            headers: {
                Authorization: getToken(),
                content_type: 'application/json',
            },
        })
            .then((response)=>{
                //exeeutes when the request is successful
                console.log(response.data.message.message);
                toast.success(response.data.message.message);
                this.props.parent.setState({shoppinglists:this.props.parent.state.shoppinglists.filter(shoppinglists => shoppinglists.id !== this.props.id )});
                let newStateArray = this.props.parent.state.shoppinglists.slice();
                newStateArray.push(response.data.shoppinglist);
                this.props.parent.setState({shoppinglists: newStateArray});



            })
            .catch((error) =>{
                //executes when the request is not successfull
                PromError(error, this);
            })
    };
    render(){
        return(
            <div>

                {/* edit shoppinglist modal */}

                <div className="modal " id="edits" role="dialog" data-backdrop="false">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <div className="modal-title"> Edit this shopping list</div>
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
                                <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" id="shopedit"
                                                       style={{float: "left", width: "150px"}}
                                                       onClick={this.editshoppinglist}>Add</ReactBootstrap.Button>
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

}export default EditShoppingList
