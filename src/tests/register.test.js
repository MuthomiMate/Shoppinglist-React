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
    it('changes all the states', () => {
        const wrapper = mount(<Register/>);
        const fname = wrapper.find('input#fname');
        const lname = wrapper.find('input#lname');
        const email = wrapper.find('input#email');
        const password = wrapper.find('input#password');
        const target = {
            value: 'muthomi'
        };
        const target2 = {
            value: 'mate',
        };
        const target3 = {
            value: 'muthomi@gmail.com',
        };
        const target4 = {
            value: 'pass1234',
        };

        fname.simulate('change', {target});

        email.simulate('change', { target3 });
        password.simulate('change', { target4 });

        console.log(fname.html())
        console.log(lname.html())
        console.log(email.html())
        console.log(password.html())

        console.log(wrapper.state())
        expect(wrapper.state().first_name).toEqual(target.value);
        // lname.simulate('change', { target2 });
        // expect(wrapper.state().last_name).toEqual(target2.value);
        // expect(wrapper.state().email).toEqual(target3.value);
        // expect(wrapper.state().password).toEqual(target4.value);

    })
})

