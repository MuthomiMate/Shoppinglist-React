import React from 'react'
import PassReset from '../resetPassword'
import ReactDOM from 'react-dom'
import Enzyme from 'enzyme'
import Toaster from '../sucessToaster';
import {mount} from 'enzyme'
import moxios from 'moxios'
import {TestUrl} from './basetest'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new Adapter()})
describe ('<PassReset/>', () =>{
    it('pass reset renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PassReset/>, div);
    });
    it('changes email state', () => {
        const wrapper = mount(<PassReset />);
        const input = wrapper.find('#email');
        const target = {
            value: 'muthomi@gmail.com',
        };
        input.simulate('change', { target });
        expect(wrapper.state().email).toEqual(target.value);
    })
    describe ('mocking axios requests', function () {
        beforeEach(function () {
            moxios.install()
        })
        afterEach(function () {
            moxios.uninstall()
        })
        it('returns positive responses', function (done) {

            const wrapper = mount(<PassReset />);
            const form = wrapper.find('form');
            const input = wrapper.find('#email')
            const event  =
                {target:{
                    value: 'muthomi@gmail.com.com',
                }};
            input.simulate('change', event)
            form.simulate('submit', { preventDefault() {} })
            let url = 'auth/passreset';
            let status =200;
            let text = { message:'Password has been sent to your email' };
            TestUrl(url,status,text);
            moxios.wait(function () {
                console.log(wrapper.find('Toaster').text());
                expect(wrapper.find('Toaster').html()).toContain('Password has been sent to your email');
                done()
            })
        })
        it('returns negative responses', function (done) {

            const wrapper = mount(<PassReset />);
            const form = wrapper.find('form');
            const input = wrapper.find('#email')
            const event  =
                {target:{
                    value: 'nn@ghmail.com',
                }};
            input.simulate('change', event)
            form.simulate('submit', { preventDefault() {} })
            TestUrl('auth/passreset', 400, { message:'user not registered. Please register ' })
            moxios.wait(function () {
                expect(wrapper.find('Toaster').html()).toContain('user not registered. Please register');
                done()
            })
        })

        })


    })


