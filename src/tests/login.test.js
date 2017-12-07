import React from 'react'
import Login from '../Login'
import ReactDOM from 'react-dom'
import Enzyme from 'enzyme'
import Toaster from '../sucessToaster'
import {shallow,mount} from 'enzyme'
import moxios from 'moxios'
import './localstorage'
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
    describe ('mocking axios requests', function () {
        beforeEach(function () {
            moxios.install()
        })
        afterEach(function () {
            moxios.uninstall()
        })
        it('logs in correct credentials', function (done) {
            moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/auth/login', {
                status: 200,
                responseText:{ message:"You logged in successfully." ,
                                access_token: "ghhjsjjsjsjsjsjj",
                                name: "Muthomi"}
            })
            let param = {"push" : () => {}}
            const wrapper = mount(<Login history={param} />);
            const submit = wrapper.find('button#btn');
            const input = wrapper.find('TextField#email')
            const pass =wrapper.find('TextField#password')
            const event  =
                {target:{
                    value: 'muthomi@gmail.com',
                }};
            const event2  =
                {target:{
                    value: 'pass123',
                }};
            input.simulate('change', event)
            pass.simulate('change', event2)
            submit.simulate('click', { preventDefault() {} })


            moxios.wait(function () {
                console.log(wrapper.find('Toaster').html());
                expect(wrapper.find('Toaster').html()).toContain("You logged in successfully.");

                done()
            });
        })
        it('shows error messages on login failure', function (done) {
            moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/auth/login', {
                status: 401,
                responseText:{ message:"Invalid email or password, Please try again" }
            })
            const wrapper = mount(<Login />);
            const submit = wrapper.find('button#btn');
            const input = wrapper.find('TextField#email')
            const pass =wrapper.find('TextField#password')
            const event  =
                {target:{
                    value: 'muthomi@gmail.com',
                }};
            const event2  =
                {target:{
                    value: 'pass123',
                }};
            input.simulate('change', event)
            pass.simulate('change', event2)
            submit.simulate('click', { preventDefault() {} })

            moxios.wait(function () {
                console.log(wrapper.find('Toaster').html());
                expect(wrapper.find('Toaster').html()).toContain("Invalid email or password, Please try again");
                done()
            })
        })


    })



})


