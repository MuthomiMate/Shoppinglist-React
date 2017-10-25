import React, {Component} from 'react';
import MainNav from "./navbar"
import axios from "axios"
import * as ReactBootstrap from 'react-bootstrap';

const  apiBaseUrl  = 'https://shopping-list-api-muthomi.herokuapp.com/';
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            shoppinglists: [],
            msg: '',
            id : '',
            name: '',
        }
    }

    componentDidMount(){
        this.getshoppinglists();
    }

    getshoppinglists (){
        axios({
            url: `${apiBaseUrl}shoppinglists/`,
            method: 'get',
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem("token"),
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
                this.setState({
                    shoppinglists:response.data,
                });

            })
            .catch((error) => {
                console.log(error.response)
        });
    }
    addshoppinglist = (event) => {
        var payload = {
            "name": this.state.name

        };
       console.log(this.state.msg);
       console.log(this.state.shoppinglists)
        axios({

            url: `${apiBaseUrl}shoppinglists/`,
            method: 'post',
            data: payload,
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem("token"),
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
    render (){

        return(
            <div>
                <MainNav/>
                <div className=" col-lg-offset-2 col-md-8 ">
                    <div className="panel panel-success">
                        <div className="panel-heading">shoppinglist</div>
                        <div className="panel-body">{this.state.msg}</div>
                        <ReactBootstrap.Button bsStyle="primary" data-toggle="modal" data-target="#adds">Add Shopping List</ReactBootstrap.Button>

                    </div>
                </div>
                <div className = "modal modal-fade" id="adds" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">


                    <div className= "modal-header">
                        <div className="modal-title">Add a shoppinglist </div>
                    </div>
                    <div className="modal-body">
                        <div className="form">
                            <div className="form-group">
                                <input className="form-control" type="text" id="name" placeholder="Enter shopping list Name"
                                       onChange={(event, newValue) => this.setState({msg:newValue})}>
                            </input>
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <ReactBootstrap.Button bsStyle="primary" style = {{float:"left", width: "150px"}} onClick={this.addshoppinglist}>Add</ReactBootstrap.Button>
                        <ReactBootstrap.Button bsStyle="primary" data-dismiss = "modal" style = {{float: "right", width: "150px"}}>çlose</ReactBootstrap.Button>
                    </div>
                        </div>
                    </div>

                </div>

            </div>

        )
    }

}
export default Dashboard;