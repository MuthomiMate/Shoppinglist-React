import React from 'react'
import Spinner from 'react-spinkit'

const LoadingSpinner = ()=> {
    return (
        <div style={{ width: '100%' }}>
            <Spinner name='ball-spin-fade-loader' style={{ position: 'fixed', margin: 'auto', top: '50%', left: '50%' }}/>
        </div>
    )

}
export default LoadingSpinner;