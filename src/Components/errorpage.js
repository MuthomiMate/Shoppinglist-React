import React from 'react'
import NavLogin from './navlogin'

const ErrorPage = ({history}) => {

    const handleClick = () =>
        history.push("/dashboard");


        return (
            <div>

                <div className="errorp" >
                    <NavLogin/>
                    <div className="errordiv">
                        <div className="btn btn-primary errorbtn" id="back" onClick={handleClick}>Back</div>
                    </div>
                </div>
            </div>
        )
    };


export default ErrorPage
