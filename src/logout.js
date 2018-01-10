import React,{Component} from 'react'

class LogoutComponent extends Component{

    Logout = () => {
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("token");
        this.props.history.push("/login")

    }
    componentDidMount() {
        this.Logout();
    }
    render(){
        return (
            <h1 className="loading-text">
                Logging out...
            </h1>
        );
    }
}
export default LogoutComponent
