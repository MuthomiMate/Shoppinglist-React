import React, {Component} from 'react';
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap';
import MainNav from "./navbar"
import Toaster from './sucessToaster'
import {toast} from 'react-toastify'
import {} from './helperfunctions'
import {PromError} from "./helperfunctions";
import LoadingSpinner from './spinner'
import {getToken, BaseUrl, PrevAndNextStates} from "./helperfunctions";
import AddItem from './addItem'
import EditItem from './editItem'
import DeleteItem from './deleteitem'


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
            showspinner: false,
            items: []

        }
        this.getItemsnext=this.getItemsnext.bind(this)
        this.getItemsprev=this.getItemsprev.bind(this)
        this.searchitem=this.searchitem.bind(this)


    }
    componentDidMount(){
        //on component mount call the get items function
        this.getItems()
    }
    getItems = () =>{
        //function to get items for a particular shopping list
        this.setState({showspinner:true})
        //sending the request
        axios({
            url: `${BaseUrl()}shoppinglists/${this.props.match.params.id}/items/`,
            method: `GET`,
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },

        })

            .then((response) => {
                //the request is successful
                this.setState({showspinner:false})
                console.log(response.data);
                if(response.data!=[]){
                    this.setState({msg: response.data.message })
                }
                //call the previous and next states function to  set the state
                PrevAndNextStates(response, this)
                this.setState({items: response.data.shopping_lists})

            })
            .catch((error) => {
                //the request is not successful call the promise error function
                this.setState({showspinner:false})
                PromError(error, this)

            })

    };
    getItemsnext = () =>{
        //gets the next page of the shopping list if next button is clicked
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
                //the request was successful
                console.log(response.data);
                if(response.data!=[]){
                    this.setState({msg: response.data.message })
                }
                //call the next and previous states function
                PrevAndNextStates(response, this)
                this.setState({items: response.data.shopping_lists})
            })
            .catch((error) => {
                //request not successful
                //call the promise error function
                PromError(error, this)
            })

    };
    getItemsprev = () =>{
        //gets the previous page items if button for previous is called
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
                //request is successfull
                console.log(response.data);
                if(response.data!=[]){
                    this.setState({msg: response.data.message })
                }PrevAndNextStates(response, this)
                //set items state to the ones that have been returned
                this.setState({items: response.data.shopping_lists})
            })
            .catch((error) => {
                //request not successful
                //call the promise error function
                PromError(error, this)
            })

    };
    searchitem =() => {
        //function to search items and also determine the items to display per page
        let urllink="";
        //make the url according to the states of search and page limit
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
            //send the request
            url: urllink,
            method: 'GET',
            headers : {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response) => {
                //request is successful
                if(response.data.message==="Shopping list name does not exist") {
                    this.setState({msg: response.data.message})

                }
                else {
                    PrevAndNextStates(response, this)
                    this.setState({items: response.data.shopping_lists})
                }
            })
            .catch((error) => {
                //request not successful call the promise error function
                PromError(error, this)
            })
    }

    render (){
        let x =0;
        let id= this.props.match.params.id;
        const items = this.state.items;
        return(
                <div>
                    <MainNav/>
                    <Toaster/>
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
                            {this.state.showspinner ? <LoadingSpinner/> :
                                <ReactBootstrap.Table responsive bordered className="sTable"
                                                      style={{marginTop: '20px'}}>
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
                                            <tr key={items.id}>
                                                <td><i>{++x}</i></td>
                                                <td>{items.name}</td>
                                                <td>
                                                    <div className="button btn-success glyphicon glyphicon-pencil"
                                                         data-toggle="modal" data-target="#edititem"
                                                         onClick={(event => this.setState({id: items.id}))}></div>
                                                </td>
                                                <td>
                                                    <div className="button btn-danger glyphicon glyphicon-trash"
                                                         data-toggle="modal" data-target="#deleteitem"
                                                         onClick={(event => this.setState({id: items.id}))}></div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </ReactBootstrap.Table>
                            }</div>}

                        <div style={{float:'right'}} >
                            {this.state.next?<div style={{padding: '5px', display: 'inline-block'}} onClick={this.getItemsnext}><ReactBootstrap.Button bsStyle="primary" >Next</ReactBootstrap.Button></div>: ""}
                            {this.state.prev?<div style={{display: 'inline-block'}} onClick={this.getItemsprev}><ReactBootstrap.Button bsStyle="primary" >prev</ReactBootstrap.Button></div>:""}
                    </div>
                    </div>

                </div>
            </div>

        </div>

        )}


}
export default ShoppingItems