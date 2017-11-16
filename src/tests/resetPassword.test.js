import React from 'react'
import PassReset from '../resetPassword'
import ReactDOM from 'react-dom'
import Enzyme from 'enzyme'
import {toast} from 'react-toastify'
import Toaster from '../sucessToaster'
import {shallow,mount} from 'enzyme'
import moxios from 'moxios'
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

})


describe ('mocking axios requests', function () {
    beforeEach(function () {
        moxios.install()
    })
    afterEach(function () {
        moxios.uninstall()
    })
    it('returns the responses according to inputs', function () {

        const wrapper = mount(<PassReset />);
        const input = wrapper.find('#button');
        const target = {
            value: 'muthomi@gmail.com',
        };
        input.simulate('click')

    })
moxios.wait(function () {
    let request = moxios.requests.mostRecent()
    request.respondWith({
        status: 200,
        response :{message:"The email has been sent to your email"}
    })
        .then(function () {
            expect( toast.success(response.data.message).toEqual("The email has been sent to you")  )

        })
})
})