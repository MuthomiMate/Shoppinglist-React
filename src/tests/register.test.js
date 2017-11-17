import React from 'react'
import Register from '../Register'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Toaster from '../sucessToaster'
import {toast} from 'react-toastify'
import  ReactDOM from 'react-dom'
import Enzyme from 'enzyme'

Enzyme.configure({adapter: new Adapter()})

describe('<Register/>', () =>{
    it('loads register page without crashing', () =>{
        const div = document.createElement('div')
        ReactDOM.render(<Register/>, div)
    })
    it('changes first name state', () => {
        const wrapper = mount(<Register/>);
        const fname = wrapper.find('input#fname');
        const lname = wrapper.find('input#lname');
        const email = wrapper.find('input#email');
        const password = wrapper.find('input#password');
        const target = {
            value: 'muthomi'
        };

        fname.simulate('change', {target})
        expect(wrapper.state().first_name).toEqual(target.value);

    })
    it('changes last name state', () => {
        const wrapper = mount(<Register/>);
        const lname = wrapper.find('input#lname');
        const target = {
            value: 'mate',
        };
        lname.simulate('change', { target });
        expect(wrapper.state().last_name).toEqual(target.value);
    })
    it('changes last name state', () => {
        const wrapper = mount(<Register/>);
        const lname = wrapper.find('input#lname');
        const target = {
            value: 'mate',
        };
        lname.simulate('change', { target });
        expect(wrapper.state().last_name).toEqual(target.value);
    })
    it('changes email state', () => {
        const wrapper = mount(<Register/>);
        const email = wrapper.find('input#email');
        const target = {
            value: 'muthomimate@gmail.com',
        };
        email.simulate('change', { target });
        expect(wrapper.state().email).toEqual(target.value);
    })
    it('changes password state', () => {
        const wrapper = mount(<Register/>);
        const pass = wrapper.find('input#password');
        const target = {
            value: 'pass1234',
        };
        pass.simulate('change', { target });
        expect(wrapper.state().password).toEqual(target.value);
    })
})

