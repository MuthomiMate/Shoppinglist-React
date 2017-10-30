import React, {Component} from 'react';

class ShoppingItems extends Component {
    constructor (props){
        super(props);
        this.state = {
            name : "",
            id: "",
            items: []

        }
    }
    getItems = () =>{
        id = this.props(id)
        
        axios({
            url: `${apiBaseUrl}`+id+`items/`,
            method: `get`,
            headers: {
                Authorization: token,
                content_type: 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.data);
            })
    }
    render (){
        return(
        <div>
        <div className = "modal " id="items" role="dialog" data-backdrop="false">
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
                                        <td>{shoppinglists.name} </td>
                                        <td><div className= "button btn-success glyphicon glyphicon-pencil" data-toggle="modal" data-target="#items" onClick={(event=>this.setState({  id: shoppinglists.id ,
                                            name:shoppinglists.name }))}></div></td>
                                        <td><div className= "button btn-danger glyphicon glyphicon-trash" data-toggle="modal" data-target="#deletes" onClick={(event=>this.setState({  id: shoppinglists.id  }))}></div></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </ReactBootstrap.Table>
                    </div>
                    <div className="modal-footer">
                        <ReactBootstrap.Button bsStyle="primary" data-dismiss = "modal" style = {{float: "right", width: "150px"}}>Cancel</ReactBootstrap.Button>
                    </div>
                </div>
            </div>

        </div>
        </div>
        )}


}