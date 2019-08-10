import React from 'react'
//stateless component for navigation bar for login
const NavLogin = ()=>{
    return (
        <div>
            <nav className="navbar navbar-inverse bg-inverse">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">shopping list react</a>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className='Navbar-nav' style={{float:"right"}}>
                            <li className="nav-item">
                                <a className="nav-link" href={'/login'}>Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={'/'}>Sign up</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    )
}
export default NavLogin
