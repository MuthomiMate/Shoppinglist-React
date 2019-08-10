import ErrorPage from '../errorpage'
import React from  'react'
import sinon from'sinon'
import {mount} from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import './localstorage'
import ReactDOM from 'react-dom'

Enzyme.configure({adapter: new Adapter()})

describe('<ErorPage/>', ()=>{
    it('Error page renders without crashing', ()=>{
        const  div =document.createElement('div')
        ReactDOM.render(<ErrorPage/>, div)
    })

    it('handle click function is called', ()=>{
        const props = {
            history: {push: sinon.spy()}
        };

        const wrapper = mount(<ErrorPage {...props} />);
        console.log(wrapper.instance())
        const back= wrapper.find('#back')
        back.simulate('click')
        expect(props.history.push.calledOnce).toEqual(true);

    })
})