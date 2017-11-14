import React, {Component} from 'react';
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
                <Nav>

                    {/*<NavItem eventKey={2} href="#">Link</NavItem>*/}
                    <NavDropdown eventKey={3} title={name} id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>change password</MenuItem>
                        {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
                        {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
                    </NavDropdown>
                    <NavItem className="nav-link" href="#">Logout</NavItem>
                </Nav>

            </Navbar>
        )
    }
}

export default MainNav;