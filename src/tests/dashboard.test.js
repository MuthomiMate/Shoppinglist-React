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
        it('displays message if no shopping lists', function (done) {
            moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/shoppinglists/', {
                status: 200,
                responseText:{ message:"You do not have  any shopping list" }
            })

            const wrapper = mount(<Dashboard/>);

            moxios.wait(function () {
                expect(wrapper.html()).toContain('You do not have  any shopping list');
                done();
            })
        })
        it('sets next page and prev page states', function (done) {
            moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/shoppinglists/', {
                status: 200,
                responseText:{next_page: "?limit=10&page=2", previous_page: "None", shopping_lists: [{date_created: "Sat, 18 Nov 2017 06:30:45 GMT", date_modified: "Sat, 18 Nov 2017 06:30:45 GMT", id: 26, name: "aa"},{date_created: "Sat, 18 Nov 2017 06:30:45 GMT", date_modified: "Sat, 18 Nov 2017 06:30:45 GMT", id: 27, name: "aaa"}
]}
            })

            const wrapper = mount(<Dashboard/>);

            moxios.wait(function () {
                console.log(wrapper.state().shoppinglists);
                expect(wrapper.state().next).toEqual("?limit=10&page=2");
                expect(wrapper.state().prev).toEqual("");
                // expect(wrapper.state().shoppinglists).toEqual("[{date_created: \"Sat, 18 Nov 2017 06:30:45 GMT\", date_modified: \"Sat, 18 Nov 2017 06:30:45 GMT\", id: 26, name: \"aa\"},{date_created: \"Sat, 18 Nov 2017 06:30:45 GMT\", date_modified: \"Sat, 18 Nov 2017 06:30:45 GMT\", id: 27, name: \"aaa\"}\n" +
                //     "]}")
                done();
            })
        })
        it('it shows errors in case token is expired ', function (done) {
            moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/shoppinglists/', {
                status: 401,
                responseText:{ message:"Your token has expired please login to get a new one" }
            })

            const wrapper = mount(<Dashboard/>);

            moxios.wait(function () {
                console.log(wrapper.text());
                expect(wrapper.find("Toaster").html()).toContain('Your token has expired please login to get a new one');
                done();
            })
        })

    })
})