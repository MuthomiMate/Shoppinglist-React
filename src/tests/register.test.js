import React from 'react'
import Register from '../Register'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Toaster from '../sucessToaster'
import  moxios from 'moxios'
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
    describe ('mocking axios requests', function () {
        beforeEach(function () {
            moxios.install()
        })
        afterEach(function () {
            moxios.uninstall()
        })
        it('registers correctly', function (done) {
            moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/auth/register', {
                status: 200,
                responseText:{ message:"You registered successfully. Please log in."}
            })
            let param = {"push" : () => {}}
            const wrapper = mount(<Register history={param} />);
            const submit = wrapper.find('form')
            wrapper.setState({first_name:'muthomi'})
            wrapper.setState({last_name:'mate'})
            wrapper.setState({email:'muthomimate@gmail.com'})
            wrapper.setState({password:'pass1234'})
            submit.simulate('submit', { preventDefault() {} })

            moxios.wait(function () {
                expect(wrapper.find('Toaster').html()).toContain("You registered successfully. Please log in.");
                done()
            }) 
        })
        it('refuses incorrect registration', function (done) {
            moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/auth/register', {
                status: 400,
                responseText:{ message:"Enter a correct email address" }
            })

            const wrapper = mount(<Register/>);
            const submit = wrapper.find('form');
            wrapper.setState({first_name:'muthomi'})
            wrapper.setState({last_name:'mate'})
            wrapper.setState({email:'muthomimatehhh'})
            wrapper.setState({password:'pass1234'})
            submit.simulate('submit', { preventDefault() {} })

            moxios.wait(function () {
                expect(wrapper.find('Toaster').html()).toContain("Enter a correct email address");
                done()
            })
        })


    })
})

