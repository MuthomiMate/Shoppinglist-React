import React, {Component} from 'react';
import MainNav from "./navbar"
import axios from "axios"

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
            "name": "mate"

        };
       console.log(payload);
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
                        <div className="button btn-primary" data-toggle="modal" data-target="#adds"> Add Shopping List</div>

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
                                       onChange={(event, newValue) => this.setState({name:newValue})}>
                            </input>
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <div className="button btn-primary" style={{float: "left", width: "150px", textAlign: "centre"}} onClick={this.addshoppinglist} >Add</div>
                        <div className="button btn-primary" data-dismiss = "modal"   style={{float:"right", width :"150px", textAlign: "centre"}}>Close</div>
                    </div>
                        </div>
                    </div>

                </div>

            </div>

        )
    }

}
export default Dashboard;