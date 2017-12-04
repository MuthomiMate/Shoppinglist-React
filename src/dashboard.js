import React, {Component} from 'react';
import MainNav from "./navbar"
import axios from "axios"
import * as ReactBootstrap from 'react-bootstrap';
import Toaster from './sucessToaster'
import {toast} from 'react-toastify'
import ShoppingList from './shoppinglist'
import {BaseUrl,PrevAndNextStates, PromError, IsLoggedIn, getToken} from "./helperfunctions";
const token = "Bearer "+window.localStorage.getItem('token');

class Dashboard extends Component{
    constructor(props){

        super(props);
        this.state = {
            shoppinglists: [],
            items: [],
            msg: '',
            id : '',
            name: '',
            search: '',
            showComponent: false,
            next: "",
            page: "",
            prev: "",
            addshoppinglist: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.searchShoppinglist = this.searchShoppinglist.bind(this)
        this.getshoppinglistnext =this.getshoppinglistnext.bind(this)
        this.getshoppinglistprev =this.getshoppinglistprev.bind(this)
        this.getshoppinglists=this.getshoppinglists.bind(this)
    }

    componentDidMount(){
        this.getshoppinglists();
    }


    getshoppinglists = ()=>{
        IsLoggedIn(this)
        axios({
            url: `${BaseUrl()}shoppinglists/`,
            method: 'get',
            headers: {
                Authorization: getToken(),
                content_type: 'application/json',
            },

        })
            .then((response) => {
                console.log(response.data)
                if(response.data.message === "You do not have  any shopping list"){
                    this.setState({
                        msg: response.data.message,
                    });

                }
                PrevAndNextStates(response, this)
                console.log(response.data.shopping_lists)
                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
                PromError(error, this)

            });
    }
    getshoppinglistnext (){

        axios({
            url: `${BaseUrl()}shoppinglists/${this.state.next}`,
            method: 'get',
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },

        })
            .then((response) => {
                console.log(response.data)
                if(response.data.message === "You do not have  any shopping list"){
                    this.setState({
                        msg: response.data.message,
                    });

                }
                PrevAndNextStates(response, this);

                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
                PromError(error, this)
            });
    }
    getshoppinglistprev (){
        console.log(this.state.prev)
        axios({
            url: `${BaseUrl()}shoppinglists/${this.state.prev}`,
            method: 'get',
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },

        })
            .then((response) => {
                console.log(response.data)
                if(response.data.message === "You do not have  any shopping list"){
                    this.setState({
                        msg: response.data.message,
                    });

                }
                PrevAndNextStates(response, this);


                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
                PromError(error, this)
            });
    }
    addshoppinglist = (event) => {
        let payload = {
            "name": this.state.name

        };
        axios({

            url: `${BaseUrl()}shoppinglists/`,
            method: 'post',
            data: payload,
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response) => {
                toast.success("Shopping list has been added successfully")
                var newStateArray = this.state.shoppinglists.slice();
                newStateArray.push(response.data);
                this.setState({shoppinglists: newStateArray});
            })
            .catch((error) => {
                PromError(error, this)
            })
    }
    editshoppinglist = () => {
        let payload = {
            "name": this.state.name
        }
        console.log(payload)
        axios({
            url: `${BaseUrl()}shoppinglists/`+this.state.id,
            method: 'PUT',
            data: payload,
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response)=>{
                console.log(response.data)
                toast.success(response.data.message.message)
                this.setState({shoppinglists:this.state.shoppinglists.filter(shoppinglists => shoppinglists.id !== this.state.id )})
                var newStateArray = this.state.shoppinglists.slice();
                newStateArray.push(response.data.shoppinglist);
                this.setState({shoppinglists: newStateArray});



            })
            .catch((error) =>{
                PromError(error, this)
            })
    }
    deleteshoppinglist = () => {
        axios({
            url: `${BaseUrl()}shoppinglists/`+this.state.id,
            method: 'DELETE',
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response) =>{
                toast.success(response.data.message)
                this.setState({shoppinglists:this.state.shoppinglists.filter(shoppinglists => shoppinglists.id !== this.state.id )})
            })
            .catch((error) =>{

               PromError(error, this)
            })

    };
    searchShoppinglist =() => {
        let urllink="";
        if(this.state.page=== "" && this.state.search===""){
            urllink = `${BaseUrl()}shoppinglists/`
        }
        if(this.state.page!=="" && this.state.search !== "" ){
            urllink =`${BaseUrl()}shoppinglists/?q=${this.state.search}&limit=${this.state.page}`
        }
        if(this.state.search!=="" && this.state.page===""){
            urllink =`${BaseUrl()}shoppinglists/?q=${this.state.search}`
        }
        if(this.state.search==="" && this.state.page!==""){
            urllink=`${BaseUrl()}shoppinglists/?limit=${this.state.page}`
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
                    this.setState({shoppinglists: response.data.shopping_lists})
                }
            })
            .catch((error) => {
                PromError(error,this)
            })
    }
    handleClick=(id)=>{
        console.log(id)
        this.setState({ id: id});
        this.props.history.push( `${id}/items`);
        console.log(this.state.id)
    }





    render () {

            const shoppinglists = this.state.shoppinglists;
            let x =0;
            return (
                <div>
                    <Toaster/>
                    <MainNav/>
                    {/*{this.state.showComponent ?*/}
                    {/*<ShoppingItems id={this.state.id} showComponent={ this.state.showComponent }/>: ""}*/}

                    <div className=" col-lg-offset-2 col-md-8 ">
                        <div className="panel panel-success">
                            <div className="panel-heading">shoppinglist</div>
                            <div className="panel-body">{this.state.msg}
                            <ReactBootstrap.Button bsStyle="primary" data-toggle="modal" data-target="#adds">Add
                                Shopping List</ReactBootstrap.Button>
                            {this.state.shoppinglists?
                                <div>
                                    <div style={{marginTop: '10px', width: '100%'}}>
                                        <div className="form form-group" style={{display: "inline-block", width: '30%'}}>
                                            <input className="form-control" type="text" placeholder="Search shoppingList" onChange={(event) => this.setState({search: event.target.value})}/>
                                        </div>
                                        <div className="form form-group" style={{display: "inline-block", width: '30%', paddingLeft: '10%'}}>
                                            <input className="form-control" type="number" min="1" max="20" placeholder="Lists per Page" onChange={(event) => this.setState({page: event.target.value})}/>
                                        </div>
                                        <div style={{ display: 'inline-block', width: '20%', paddingLeft: '10%'}}>
                                        <ReactBootstrap.Button bsStyle="primary" onClick={this.searchShoppinglist}>Search</ReactBootstrap.Button>
                                        </div>
                                    </div>
                            <ReactBootstrap.Table responsive bordered className="sTable" style={{marginTop: '20px'}}>
                                <thead className="bg-info">
                                <tr>
                                    <th></th>
                                    <th>Shoppinglist Name</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    shoppinglists.map((shoppinglists) => (
                                        <ShoppingList id={shoppinglists.id} name={shoppinglists.name} number={++x} handleClick = {this.handleClick} parent={this}/>
                                    ))
                                }
                                </tbody>
                            </ReactBootstrap.Table>
                                <div style={{float:'right'}} >
                                    {this.state.next?<div style={{padding: '5px', display: 'inline-block'}} onClick={this.getshoppinglistnext}><ReactBootstrap.Button bsStyle="primary" >Next</ReactBootstrap.Button></div>: ""}
                                    {this.state.prev?<div style={{display: 'inline-block'}} onClick={this.getshoppinglistprev}><ReactBootstrap.Button bsStyle="primary" >prev</ReactBootstrap.Button></div>:""}
                                </div>
                        </div>: ""}
                    </div>
                        </div>
                    </div>
                    <div className="modal " id="adds" role="dialog" data-backdrop="false">
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
                                    <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal"
                                                           style={{float: "left", width: "150px"}}
                                                           onClick={this.addshoppinglist}>Add</ReactBootstrap.Button>
                                    <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" style={{
                                        float: "right",
                                        width: "150px"
                                    }}>çlose</ReactBootstrap.Button>
                                </div>
                            </div>
                        </div>

                    </div>
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
                                                   placeholder="Enter new shopping list Name"
                                                   onChange={(event) => this.setState({name: event.target.value})}>
                                            </input>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal"
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


}
export default Dashboard;