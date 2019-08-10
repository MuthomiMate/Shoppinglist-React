import React, {Component} from 'react'
import EditShoppingList from './editshoppinglist'
import DeleteShoppingList from './deleteshoppinglist'


class ShoppingList extends Component{
    constructor (props){
        super(props)
        this.state = {
            id: "",
            name: "",
            showeditcomponent: false,
            showdeleteComponent: false
        }
    }
 render(){
        return(
                <tr  key={this.props.id}>
                    <td><i>{this.props.number}</i></td>

                    <td>{this.props.name} </td>
                    <td>
                        <div className="button btn-primary glyphicon glyphicon-eye-open"
                             data-toggle="modal" data-target="#items"
                             onClick={(e) => this.props.handleClick(this.props.id)}></div>
                    </td>
                    <td>
                        <div className="button btn-success glyphicon glyphicon-pencil"
                             data-toggle="modal" data-target="#edits"
                             onClick={(e) =>this.setState({showeditcomponent:true})}></div>
                        {this.state.showeditcomponent?
                            <EditShoppingList name={this.props.name} parent={this.props.parent} id={this.props.id}/>:""}

                    </td>
                    <td>
                        <div className="button btn-danger glyphicon glyphicon-trash"
                             data-toggle="modal" data-target="#deletes" onClick={(e) => this.setState({showdeleteComponent:true})}></div>
                        { this.state.showdeleteComponent?
                        <DeleteShoppingList parent={this.props.parent} name={this.props.name} id={this.props.id}/>: ""}
                    </td>
                </tr>

        )
 }
}
export default ShoppingList