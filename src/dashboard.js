import React, {Component} from 'react';
import MainNav from "./navbar"
import axios from "axios"
import * as ReactBootstrap from 'react-bootstrap';
import Toaster from './sucessToaster'
import {toast} from 'react-toastify'
import ShoppingList from './shoppinglist'
import LoadingSpinner from './spinner'
import AddShoppingList from './addshoppinglist'
import {BaseUrl,PrevAndNextStates, PromError, IsLoggedIn, getToken} from "./helperfunctions";
const token = "Bearer "+window.localStorage.getItem('token');

class Dashboard extends Component{
    constructor(props){

        super(props);
        this.state = {
            shoppinglists: [],
            msg: '',
            id : '',
            name: '',
            search: '',
            showComponent: false,
            next: "",
            page: "",
            prev: "",
            addshoppinglist: "",
            spinnershow: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.searchShoppinglist = this.searchShoppinglist.bind(this);
        this.getshoppinglistnext =this.getshoppinglistnext.bind(this);
        this.getshoppinglistprev =this.getshoppinglistprev.bind(this);
        this.getshoppinglists=this.getshoppinglists.bind(this);
    }

    componentDidMount(){
        this.getshoppinglists();
    }
    logout = () => {
        //define a function to logout a user
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("name");
        //redirect to login page
        this.props.history.push("/login");
    };

    getshoppinglists = ()=>{
        //function to get all the shopping lists for a particular user
        this.setState({spinnershow:true});
        IsLoggedIn(this);
        axios({
            url: `${BaseUrl()}shoppinglists/`,
            method: 'get',
            headers: {
                Authorization: getToken(),
                content_type: 'application/json',
            },

        })
            .then((response) => {
                this.setState({spinnershow:false});
                if(response.data.message === "You do not have  any shopping list"){
                    this.setState({
                        msg: response.data.message,
                    });

                }
                //call method to setStates for previous and next
                PrevAndNextStates(response, this);
                //setstate for shoppinglist to the returned values
                this.setState({
                    shoppinglists:response.data.shopping_lists


                });

            })
            .catch((error) => {
            this.setState({spinnershow:false});
                //call promise error function
                PromError(error, this);

            });
    };
    getshoppinglistnext (){
    //method to get the next page shoppinglist when you click next
        axios({
            url: `${BaseUrl()}shoppinglists/${this.state.next}`,
            method: 'get',
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },

        })
            .then((response) => {
                console.log(response.data);
                //call nest and previous state function to set states
                PrevAndNextStates(response, this);

                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
            //call promise error function
                PromError(error, this);
            });
    };
    getshoppinglistprev (){
        //function to get the previous page shopping list if the previous button is clicked
        console.log(this.state.prev);
        axios({
            url: `${BaseUrl()}shoppinglists/${this.state.prev}`,
            method: 'get',
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },

        })
            .then((response) => {
            //call function to set previous and next states
                PrevAndNextStates(response, this);
                //set the shopping list state to the shopping lists that have been returned
                this.setState({
                    shoppinglists:response.data.shopping_lists

                });


            })
            .catch((error) => {
            //call the function to handle the promise errors
                PromError(error, this)
            });
    };

    searchShoppinglist =() => {
        let {page, search} =this.state
        //this is the function that handles both search and page limit(the number of list to display per page)
        let urllink="";
        // check states of the page(which is the page limit) and search(the search option)
        // and make url depending on that before sending it to the server

        switch(true){
            case page=== "" && search==="":
               urllink = `${BaseUrl()}shoppinglists/`;
               break;
            case page!=="" && search !== "":
                urllink =`${BaseUrl()}shoppinglists/?q=${search}&limit=${page}`
                break;
            case search!=="" && page==="":
                urllink =`${BaseUrl()}shoppinglists/?q=${search}`
                break;
            case search==="" && page!=="":
                urllink=`${BaseUrl()}shoppinglists/?limit=${page}`
                break;
        }

        console.log(urllink);
        //send the request
        axios({
            url: urllink,
            method: 'GET',
            headers : {
                Authorization: token,
                content_type: 'application/json',
            },
        })
            .then((response) => {
                // the request is successful
                console.log(response.data);
                if(response.data.message==="Shopping list name does not exist") {
                    this.setState({msg: response.data.message});

                }
                else {
                    this.setState({shoppinglists: response.data.shopping_lists});
                }
            })
            .catch((error) => {
                //the request is not successful call the promise error function
                PromError(error,this)
            })
    };
    handleClick=(id)=>{
        //function that handles click on view shopping list
        console.log(id);
        this.setState({ id: id});
        //redirects to the items of that shopping list
        this.props.history.push( `${id}/items`);
        console.log(this.state.id);
    };





    render () {

            const shoppinglists = this.state.shoppinglists;
            let x =0;
            return (
                <div>
                    <Toaster/>
                    <MainNav logout={this.logout}/>

                    <div className=" col-lg-offset-2 col-md-8 ">
                        <div className="panel panel-success">
                            <div className="panel-heading">shoppinglist</div>
                            <div className="panel-body">{this.state.msg}
                            <ReactBootstrap.Button bsStyle="primary" data-toggle="modal" data-target="#adds">Add
                                Shopping List</ReactBootstrap.Button>
                            {this.state.shoppinglists?
                                <div>
                                    <AddShoppingList parent={this}/>
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
                                {this.state.spinnershow?<LoadingSpinner/>: ""}
                                {
                                    shoppinglists.map((shoppinglists) => (
                                        <ShoppingList id={shoppinglists.id} name={shoppinglists.name} number={++x} handleClick = {this.handleClick} parent={this}/>
                                    ))
                                }
                                </tbody>
                            </ReactBootstrap.Table>
                                <div style={{float:'right'}} >
                                    {this.state.next?<div style={{padding: '5px', display: 'inline-block'}} onClick={this.getshoppinglistnext}><ReactBootstrap.Button bsStyle="primary" id="next">Next</ReactBootstrap.Button></div>: ""}
                                    {this.state.prev?<div style={{display: 'inline-block'}} onClick={this.getshoppinglistprev}><ReactBootstrap.Button bsStyle="primary" id="prev">prev</ReactBootstrap.Button></div>:""}
                                </div>
                        </div>: ""}
                    </div>
                        </div>
                    </div>






                </div>

            )
        }


}
export default Dashboard;