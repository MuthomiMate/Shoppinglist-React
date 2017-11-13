import React, {Component} from 'react';
import MainNav from "./navbar"
import ShoppingItems from "./shoppingItems"
import axios from "axios"
import ReactTooltip from 'react-tooltip'
import * as ReactBootstrap from 'react-bootstrap';

const  apiBaseUrl  = 'https://shopping-list-api-muthomi.herokuapp.com/';
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
            showComponent: false,
            next: "",
            prev: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.getshoppinglistnext =this.getshoppinglistnext.bind(this)
        this.getshoppinglistprev =this.getshoppinglistprev.bind(this)
        this.getshoppinglists=this.getshoppinglists.bind(this)
    }

    componentDidMount(){
        this.getshoppinglists();
    }


    getshoppinglists (){
        axios({
            url: `${apiBaseUrl}shoppinglists/`,
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
                if (response.data.previous_page != "None"){
                    this.setState({prev:response.data.previous_page});
                }
                else{
                    this.setState({prev:''});
                }
                if (response.data.next_page != "None"){
                    this.setState({next:response.data.next_page});
                }else{
                    this.setState({next:''});
                }

                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
                console.log(error.response)
            });
    }
    getshoppinglistnext (){

        axios({
            url: `${apiBaseUrl}shoppinglists/${this.state.next}`,
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
                if (response.data.previous_page != "None"){
                    this.setState({prev:response.data.previous_page});
                }else {
                    this.setState({prev:''});
                }
                if (response.data.next_page != "None"){
                    this.setState({next:response.data.next_page});
                }else {
                    this.setState({next:''});
                }

                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
                console.log(error.response)
            });
    }
    getshoppinglistprev (){
        console.log(this.state.prev)
        axios({
            url: `${apiBaseUrl}shoppinglists/${this.state.prev}`,
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
                if (response.data.previous_page != "None"){
                    this.setState({prev:response.data.previous_page});
                }else {
                    this.setState({prev:''});
                }
                if (response.data.next_page != "None"){
                    this.setState({next:response.data.next_page});
                }else {
                    this.setState({next:''});
                }
                console.log(this.state.prev)


                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
                console.log(error.response)
            });
    }
    addshoppinglist = (event) => {
        let payload = {
            "name": this.state.name

        };
        axios({

            url: `${apiBaseUrl}shoppinglists/`,
            method: 'post',
            data: payload,
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response) => {
                console.log(response.data)



            })
            .catch((error) => {
                console.log((error.response))
            })
    }
    editshoppinglist = (event, id) => {
        let payload = {
            "name": this.state.name
        }
        console.log(payload)
        axios({
            url: `${apiBaseUrl}shoppinglists/`+this.state.id,
            method: 'PUT',
            data: payload,
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response)=>{
                console.log(response.data)
            })
            .catch((error) =>{
                console.log(error.response)
            })
    }
    deleteshoppinglist = (event,id) => {
        axios({
            url: `${apiBaseUrl}shoppinglists/`+this.state.id,
            method: 'DELETE',
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response) =>{
                console.log(response.data)
            })
            .catch((error) =>{
                console.log(error.data)
            })

    };
    handleClick(id, e){
        console.log(id)
        this.setState({ id: id});
        this.props.history.push( `${id}/items`);
        console.log(this.state.id)
    }




    render () {

            const shoppinglists = this.state.shoppinglists;
            let x = 0;
            return (
                <div>
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
                                        <tr className="buckets" key={shoppinglists.id}>
                                            <td><i>{++x}</i></td>

                                            <td>{shoppinglists.name} </td>
                                            <td>
                                                <div className="button btn-primary glyphicon glyphicon-eye-open"
                                                     data-toggle="modal" data-target="#items"
                                                     onClick={(e) => this.handleClick(shoppinglists.id, e)}></div>
                                            </td>
                                            <td>
                                                <div className="button btn-success glyphicon glyphicon-pencil"
                                                     data-toggle="modal" data-target="#edits"
                                                     onClick={(event => this.setState({id: shoppinglists.id}))}></div>
                                            </td>
                                            <td>
                                                <div className="button btn-danger glyphicon glyphicon-trash"
                                                     data-toggle="modal" data-target="#deletes"
                                                     onClick={(event => this.setState({id: shoppinglists.id}))}></div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </ReactBootstrap.Table>

                        <div style={{float: "right"} }>
                            {this.state.prev ?<div className="button btn-primary" onClick={this.getshoppinglistprev }>Prev</div>: ""}
                            {this.state.next ?<div className="button btn-primary" onClick={this.getshoppinglistnext } >Next</div>: ""}
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