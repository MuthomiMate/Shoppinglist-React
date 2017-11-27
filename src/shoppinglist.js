import React, {Component} from 'react'
import Dashboard from './dashboard'


class ShoppingList extends Component{
    constructor (props){
        super(props)
        this.state = {
            id: "",
            name: ""
        }
    }
 render(){
     let x = 0;
        return(
                <tr  key={this.props.id}>
                    <td><i>{this.props.number}</i></td>

                    <td>{this.props.name} </td>
                    <td>
                        <div className="button btn-primary glyphicon glyphicon-eye-open"
                             data-toggle="modal" data-target="#items"
                             onClick={(e) => this.handleClick(this.props.id, e)}></div>
                    </td>
                    <td>
                        <div className="button btn-success glyphicon glyphicon-pencil"
                             data-toggle="modal" data-target="#edits"
                             onClick={(event => this.setState({id: this.props.id}))}></div>
                    </td>
                    <td>
                        <div className="button btn-danger glyphicon glyphicon-trash"
                             data-toggle="modal" data-target="#deletes"
                             onClick={(event => this.setState({id: this.props.id}))}></div>
                    </td>
                </tr>

        )
 }
}
export default ShoppingList