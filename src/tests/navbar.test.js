import MainNav from '../navbar'
import React from  'react'
import './localstorage'
import ReactDOM from 'react-dom'


describe('<MainNav/>', ()=>{
    it('Navbar renders without crashing', ()=>{
        const  div =document.createElement('div')
        ReactDOM.render(<MainNav/>, div)
    })
})