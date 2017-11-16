import React from 'react'
import PassReset from '../resetPassword'
import ReactDOM from 'react-dom'
import Enzyme from 'enzyme'
import {shallow,mount} from 'enzyme'
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


