import React from 'react'
import ChangePassword from '../changePassword'
import {mount} from 'enzyme'
import ReactDOM from 'react-dom'
import './localstorage'
import Enzyme from 'enzyme'
import  Toaster from '../sucessToaster'
import moxios from 'moxios'
import {TestUrl} from './basetest'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})
describe('<ChangePassword/>', () =>{
    it('renders change password page without crashing', () =>{
        const div = document.createElement('div')
        ReactDOM.render(<ChangePassword/>, div)
    })
    it('changes password state', () => {
        const wrapper = mount(<ChangePassword/>);
        const pass = wrapper.find('input#password');
        const target = {
            value: 'pass1234',
        };
        pass.simulate('change', { target });
        expect(wrapper.state().password).toEqual(target.value);
    })
    it('changes old password state', () => {
        const wrapper = mount(<ChangePassword/>);
        const pass = wrapper.find('input#new_password');
        const target = {
            value: 'pass12345',
        };
        pass.simulate('change', { target });
        expect(wrapper.state().newPassword).toEqual(target.value);
    })
    describe ('mocking axios requests', function () {
        beforeEach(function () {
            moxios.install()
        })
        afterEach(function () {
            moxios.uninstall()
        })
        it('successfully changes password', function (done) {
            let url = 'auth/ccpas'
            let status= 200
            let text = { message:"password changed sucessfully. Please login again"}
            TestUrl(url, status, text)
            const wrapper = mount(<ChangePassword/>);
            const submit = wrapper.find('form')
            const oldpass= wrapper.find('input#password')
            const newpass= wrapper.find('input#new_password')
            const event  =
                {target:{
                    value: 'pass123',
                }};
            const event2  =
                {target:{
                    value: 'pass1234',
                }};
            oldpass.simulate('change', event)
            newpass.simulate('change', event2)

            submit.simulate('submit', { preventDefault() {} })

            moxios.wait(function () {
                console.log(wrapper.find('Toaster').html());
                expect(wrapper.find('Toaster').html()).toContain("password changed sucessfully. Please login again");
                done()
            })
        })
        it('throws error on wrong password', function (done) {
            TestUrl('auth/ccpas', 401, {message:"password entered is incorrect. Try again!"})
            const wrapper = mount(<ChangePassword/>);
            const submit = wrapper.find('form')
            const oldpass= wrapper.find('input#password')
            const newpass= wrapper.find('input#new_password')
            const event  =
                {target:{
                    value: 'pass12',
                }};
            const event2  =
                {target:{
                    value: 'pass1234',
                }};
            oldpass.simulate('change', event)
            newpass.simulate('change', event2)

            submit.simulate('submit', { preventDefault() {} })

            moxios.wait(function () {
                console.log(wrapper.find('Toaster').html());
                expect(wrapper.find('Toaster').html()).toContain("password entered is incorrect. Try again!");
                done()
            })
        })


    })
})