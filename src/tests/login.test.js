import React from 'react'
import Login from '../Login'
import ReactDOM from 'react-dom'
import Enzyme from 'enzyme'


import {shallow,mount} from 'enzyme'
import moxios from 'moxios'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new Adapter()})
describe ('<Login/>', () =>{
    it('pass reset renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login/>, div);
    });
    it('changes email state', () => {
        const wrapper = mount(<Login/>);
        const input = wrapper.find('input#email');
        const target = {
            value: 'muthomi@gmail.com',
        };
        input.simulate('change', { target });
        expect(wrapper.state().email).toEqual(target.value);
    })
    it('changes password state', () => {
        const wrapper = mount(<Login/>);
        const input = wrapper.find('input#password');
        const target = {
            value: 'pass123',
        };
        input.simulate('change', { target });
        expect(wrapper.state().password).toEqual(target.value);
    })



})


