import React, {Component} from 'react';
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap';
import MainNav from "./navbar"

const  apiBaseUrl  = 'https://shopping-list-api-muthomi.herokuapp.com/shoppinglists/';
import {BaseUrl, PrevAndNextStates} from "./helperfunctions";

const token = "Bearer "+window.localStorage.getItem('token');
class ShoppingItems extends Component {
    constructor (props){
        super(props);

        this.state = {
            name : "",
            id: "",
            msg: "",
            next: "",
            prev: "",
            search: "",
            page: "",
            items: []

        }
        this.getItemsnext=this.getItemsnext.bind(this)
        this.getItemsprev=this.getItemsprev.bind(this)
        this.searchitem=this.searchitem.bind(this)


    }
    componentDidMount(){
        this.getItems()
    }
    getItems = () =>{
        axios({
            url: `${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/`,
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
                PrevAndNextStates(response, this)
                this.setState({items: response.data.shopping_lists})
            })
            .catch((error) => {
                PromError(error, this)
            })

    };
    getItemsnext = () =>{
        console.log(this.props.id);
        axios({
            url: `${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/${this.state.next}`,
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
                PrevAndNextStates(response, this)
                this.setState({items: response.data.shopping_lists})
            })
            .catch((error) => {
                PromError(error, this)
            })

    };
    getItemsprev = () =>{
        console.log(this.props.id);
        axios({
            url: `${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/${this.state.prev}`,
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
                }PrevAndNextStates(response, this)
                this.setState({items: response.data.shopping_lists})
            })
            .catch((error) => {
                PromError(error, this)
            })

    };
    searchitem =() => {
        let urllink="";
        if(this.state.page=== "" && this.state.search===""){
            urllink = `${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/`
        }
        if(this.state.page!=="" && this.state.search !== "" ){
            urllink =`${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/?q=${this.state.search}&limit=${this.state.page}`
        }
        if(this.state.search!=="" && this.state.page===""){
            urllink =`${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/?q=${this.state.search}`
        }
        if(this.state.search==="" && this.state.page!==""){
            urllink=`${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/?limit=${this.state.page}`
        }
        console.log(urllink)
        axios({
            url: urllink,
            method: 'GET',
            headers : {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response) => {
                console.log(response.data)
                if(response.data.message==="Shopping list name does not exist") {
                    this.setState({msg: response.data.message})

                }
                else {
                    this.setState({items: response.data})
                    PrevAndNextStates(response, this)
                }
            })
            .catch((error) => {
                PromError(error, this)
            })
    }
    addItem = (event) =>{
        let payload = {
            'name': this.state.name
        };
        axios({
            url: `${apiBaseUrl}${this.props.match.params.id}/items/`,
            url: `${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/`,
            method : 'post',
            data: payload,
            headers : {
                Authorization : token,
                content_type: 'application/json',
            }
        })
            .then((response) =>{

            })
            .catch((error) =>{
                PromError(error, this)
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
            url: `${BaseUrl()}shoppinglists/items/${this.state.id}`,
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
                PromError(error, this)
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
                    <ReactBootstrap.Button bsStyle="primary" data-toggle="modal" data-target="#additem">Add
                        Item</ReactBootstrap.Button>
                    {this.state.msg ? <div className="Alert alert-danger" style={{marginTop:"20px"}}>{this.state.msg} </div>:
                        <div>
                        <div style={{marginTop: '10px', width: '100%'}}>
                            <div className="form form-group" style={{display: "inline-block", width: '30%' }}>
                                <input className="form-control" type="text" placeholder="Search items" onChange={(event) => this.setState({search: event.target.value})}/>
                            </div>
                            <div className="form form-group" style={{display: "inline-block", width: '30%', paddingLeft: '10%'}}>
                                <input className="form-control" type="number" min="1" max="20" placeholder="Items per Page" onChange={(event) => this.setState({page: event.target.value})}/>
                            </div>
                            <div style={{ display: 'inline-block', width: '20%', paddingLeft: '10%'}}>
                                <ReactBootstrap.Button bsStyle="primary" onClick={this.searchitem}>Go</ReactBootstrap.Button>
                            </div>
                        </div>
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
                    </ReactBootstrap.Table></div>}

                        <div style={{float:'right'}} >
                            {this.state.next?<div style={{padding: '5px', display: 'inline-block'}} onClick={this.getItemsnext}><ReactBootstrap.Button bsStyle="primary" >Next</ReactBootstrap.Button></div>: ""}
                            {this.state.prev?<div style={{display: 'inline-block'}} onClick={this.getItemsprev}><ReactBootstrap.Button bsStyle="primary" >prev</ReactBootstrap.Button></div>:""}
                    </div>
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