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


            </div>

        )
    }

}
export default Dashboard;