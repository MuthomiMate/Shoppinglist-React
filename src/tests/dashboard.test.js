import React from 'react'
import ReactDom from 'react-dom'
import {mount} from 'enzyme'
import Toaster from '../sucessToaster'
import Enzyme from 'enzyme'
import moxios from 'moxios'
import sinon from 'sinon'
import './localstorage'
import Dashboard from '../dashboard'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

describe('<Dashboard/>', ()=>{
    describe ('mocking axios requests', function () {
        beforeEach(function () {
            moxios.install()
        })
        afterEach(function () {
            moxios.uninstall()
        })
        it('calls componentDidMount', () => {

            const spy = sinon.spy(Dashboard.prototype, 'componentDidMount');
            const wrapper = mount(<Dashboard/>);
            expect(spy.calledOnce).toEqual(true);
        });

    })
})