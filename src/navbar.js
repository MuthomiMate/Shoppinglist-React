import React, {Component} from 'react';
import {Logout} from './helperfunctions'
import {Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';

class MainNav extends Component {
    constructor(props){
        super(props);
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
                    <MenuItem href="/dashboard">shopping lists</MenuItem>
                    <NavDropdown  title={name} id="basic-nav-dropdown">
                        <MenuItem href="/ccpass"> change password</MenuItem>
                        <MenuItem onClick={this.props.logout} > logout</MenuItem>
                    </NavDropdown>
                </Nav>
                </div>
            </Navbar>
        )
    }
}

export default MainNav;