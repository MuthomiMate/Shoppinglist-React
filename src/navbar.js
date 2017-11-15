import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class MainNav extends Component {
    constructor(props){
        super(props);
        this.logout= this.logout.bind(this)


    }

    logout = (event) =>
    {
        window.localStorage.removeItem('token')

    }

    render() {
        const name= window.localStorage.getItem('name')
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">shopping List React</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <div style={{float:'right'}}>
                <Nav>
                    <NavDropdown  title={name} id="basic-nav-dropdown">
                        <MenuItem><Link to="/ccpass">change password</Link></MenuItem>
                    </NavDropdown>
                    <NavItem className="nav-link" href={"/login"}>logout</NavItem>
                </Nav>
                </div>
            </Navbar>
        )
    }
}

export default MainNav;