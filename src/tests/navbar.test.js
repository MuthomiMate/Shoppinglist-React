import MainNav from '../navbar'
import {mount} from 'enzyme'
import React from  'react'
import Enzyme from 'enzyme'
import './localstorage'
import ReactDOM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

describe('<MainNav/>', ()=>{
    it('Navbar renders without crashing', ()=>{
        const  div =document.createElement('div')
        ReactDOM.render(<MainNav/>, div)
    })
})