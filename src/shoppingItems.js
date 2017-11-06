import React, {Component} from 'react';
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap';
import MainNav from "./navbar"

const  apiBaseUrl  = 'https://shopping-list-api-muthomi.herokuapp.com/shoppinglists/';

const token = "Bearer "+window.localStorage.getItem('token');
class ShoppingItems extends Component {
    constructor (props){
        super(props);
        console.log(this.props.match.params.id)
        this.state = {
            name : "",
            id: "",
            msg: "",
            items: []

        }


    }
    componentDidMount(){
        this.getItems()
    }
    getItems = () =>{
        console.log(this.props.id);
        axios({
            url: `${apiBaseUrl}${this.props.match.params.id}/items/`,
            method: `GET`,
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },

        })

            .then((response) => {
                console.log(response.data);
                if(response.data!=[]){
                    this.setState({msg: response.data.message })
                }
                this.setState({items: response.data})
            })
            .catch((error) => {
                console.log(error.data);
            })

    };
    addItem = (event) =>{
        let payload = {
            'name': this.state.name
        };
        axios({
            url: `${apiBaseUrl}${this.props.match.params.id}/items/`,
            method : 'post',
            data: payload,
            headers : {
                Authorization : token,
                content_type: 'application/json',
            }
        })
            .then((response) =>{
                console.log(response.data)
            })
            .catch((error) =>{
                console.log(error.data)
            })
    }
    editItem = (event) => {
        let payload = {
            "name": this.state.name
        }
        axios({
            url: `${apiBaseUrl}items/${this.state.id}`,
            method: 'PUT',
            data: payload,
            headers: {
                Authorization: token,
                content_type: 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.data)
            })

    }
    deleteItem = (event) => {
        axios({
            url: `${apiBaseUrl}items/${this.state.id}`,
            method: 'DELETE',
            headers: {
                Authorization: token,
                content_type: 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.data)
            })

    }
    render (){
        let x =0;

        const items = this.state.items;
        return(
                <div>
                    <MainNav/>

            <div className=" col-lg-offset-2 col-md-8 ">
                <div className="panel panel-success">
                    <div className="panel-heading">shopping Items</div>
                    <div className="panel-body">
                    <ReactBootstrap.Button bsStyle="primary" data-toggle="modal" data-target="#adds">Add
                        Item</ReactBootstrap.Button>
                    {this.state.msg ? <div className="Alert alert-danger" style={{marginTop:"20px"}}>{this.state.msg} </div>:
                    <ReactBootstrap.Table responsive bordered className="sTable" style={{marginTop: '20px'}}>
                        <thead className="bg-info">
                        <tr>
                            <th></th>
                            <th>Item Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items.map((items) => (
                                <tr key = {items.id}>
                                    <td><i>{++x}</i></td>
                                    <td>{items.name}</td>
                                    <td><div className= "button btn-success glyphicon glyphicon-pencil" data-toggle="modal" data-target="#edititem" onClick={(event => this.setState({id: items.id}))}></div></td>
                                    <td><div className= "button btn-danger glyphicon glyphicon-trash" data-toggle="modal" data-target="#deleteitem" onClick={(event => this.setState({id: items.id}))}></div></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </ReactBootstrap.Table>}
                    </div>

                </div>
            </div>
            <div className="modal " id="additem" role="dialog" data-backdrop="false">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <div className="modal-title">Add Item</div>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <div className="form-group">
                                    <input className="form-control" type="text" id="name"
                                           placeholder="Enter an item Name"
                                           onChange={(event) => this.setState({name: event.target.value})}>
                                    </input>
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
                                           placeholder="Enter new Item Name"
                                           onChange={(event) => this.setState({name: event.target.value})}>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal"
                                                   style={{float: "left", width: "150px"}}
                                                   onClick={this.editItem}>Add</ReactBootstrap.Button>
                            <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" style={{
                                float: "right",
                                width: "150px"
                            }}>çlose</ReactBootstrap.Button>
                        </div>
                    </div>
                </div>

            </div>
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

            </div>

        </div>

        )}


}
export default ShoppingItems