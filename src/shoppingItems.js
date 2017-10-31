import React, {Component} from 'react';
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap';

const  apiBaseUrl  = 'https://shopping-list-api-muthomi.herokuapp.com/shoppinglists/';

const token = "Bearer "+window.localStorage.getItem('token');
class ShoppingItems extends Component {
    constructor (props){
        super(props);
        console.log(props);
        this.state = {
            name : "",
            id: "",
            items: []

        }


    }
    componentDidMount(){
        this.getItems()
    }
    getItems = () =>{
        console.log(this.props.id);
        axios({
            url: `${apiBaseUrl}`+this.props.id+`/items/`,
            method: `GET`,
            headers: {
                Authorization: token,
                content_type: 'application/json',
            },

        })

            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.data);
            })

    };
    render (){
        let x =0;

        const items = this.state.items;
        return(
        <div>
        <div className = "modal" id="items" role="dialog" data-backdrop="false" style={{display: this.props.showComponent ? 'block' : 'none'}} >
            <div className="modal-dialog">
                <div className="modal-content">


                    <div className= "modal-header">
                        <div className="modal-title text-center"> {this.state.name}</div>
                    </div>
                    <div className="modal-body">
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
                                    <tr className="buckets" key = {items.id}>
                                        <td><i>{++x}</i></td>
                                        <td>mmm</td>
                                        <td><div className= "button btn-success glyphicon glyphicon-pencil" data-toggle="modal" data-target="#items" ></div></td>
                                        <td><div className= "button btn-danger glyphicon glyphicon-trash" data-toggle="modal" data-target="#deletes"></div></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </ReactBootstrap.Table>
                    </div>
                    <div className="modal-footer">
                        <ReactBootstrap.Button bsStyle="primary" data-dismiss="modal" style = {{float: "right", width: "150px"}}>Cancel</ReactBootstrap.Button>
                    </div>
                </div>
            </div>

        </div>
        </div>
        )}


}
export default ShoppingItems