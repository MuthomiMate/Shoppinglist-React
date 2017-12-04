import React, {Component} from 'react'
import NavLogin from './navlogin'
class ErrorPage extends Component {
    constructor(props){
        super(props)
    this.handleClick = this.handleClick.bind(this)
    }
    handleClick = () => {
        this.props.history.push("/dashboard")
    }
    render (){
        return (
            <div>

            <div className="errorp" >
                <NavLogin/>
            <div className="errordiv">
                <div className="btn btn-primary errorbtn" onClick={this.handleClick}>Back</div>
            </div>
            </div>
            </div>
        )
    }
}
export default ErrorPage
