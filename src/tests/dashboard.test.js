import React from 'react'
import {mount} from 'enzyme'
import Toaster from '../sucessToaster'
import Enzyme from 'enzyme'
import moxios from 'moxios'
import sinon from 'sinon'
import './localstorage'
import Dashboard from '../dashboard'
import {TestUrl} from './basetest'
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
            TestUrl('shoppinglists/', 200, { message:"You do not have  any shopping list" })

            const wrapper = mount(<Dashboard/>);

            moxios.wait(function () {
                expect(wrapper.html()).toContain('You do not have  any shopping list');
                done();
            })
        })
        it('sets next page and prev page states', function (done) {
            TestUrl('shoppinglists/', 200, {next_page: "?limit=10&page=2", previous_page: "None", shopping_lists: [{date_created: "Sat, 18 Nov 2017 06:30:45 GMT", date_modified: "Sat, 18 Nov 2017 06:30:45 GMT", id: 26, name: "aa"},{date_created: "Sat, 18 Nov 2017 06:30:45 GMT", date_modified: "Sat, 18 Nov 2017 06:30:45 GMT", id: 27, name: "aaa"}
                ]}
            )
            const wrapper = mount(<Dashboard/>);

            moxios.wait(function () {
                expect(wrapper.state().next).toEqual("?limit=10&page=2");
                expect(wrapper.state().prev).toEqual("");
                done();

            })
        })
        it('it shows errors in case token is expired ', function (done) {
            TestUrl('shoppinglists/', 401, { message:"Your token has expired please login to get a new one" })

            const wrapper = mount(<Dashboard/>);

            moxios.wait(function () {
                expect(wrapper.find("Toaster").html()).toContain('Your token has expired please login to get a new one');
                done();
            })
        })
        it('it gets shoppinglist next page ', function (done) {

            const wrapper = mount(<Dashboard/>);
            wrapper.setState({next:"?limit=10&page=2"})
            const back= wrapper.find('button#next')
            back.simulate('click')
            TestUrl('shoppinglists/?limit=10&page=2', 200, {next_page: "?limit=10&page=2", previous_page: "None", shopping_lists: [{date_created: "Sat, 18 Nov 2017 06:30:45 GMT", date_modified: "Sat, 18 Nov 2017 06:30:45 GMT", id: 26, name: "pooolparty"},{date_created: "Sat, 18 Nov 2017 06:30:45 GMT", date_modified: "Sat, 18 Nov 2017 06:30:45 GMT", id: 27, name: "aaa"}
            ]})
            moxios.wait(function () {
                expect(wrapper.html()).toContain('pooolparty');
                done();
            })
        })
        it('it gets shoppinglist previous page ', function (done) {

            const wrapper = mount(<Dashboard/>);
            wrapper.setState({prev:"?limit=10&page=1"})
            const back= wrapper.find('button#prev')
            back.simulate('click')
            TestUrl('shoppinglists/?limit=10&page=1', 200, {
                next_page: "?limit=10&page=2",
                previous_page: "None", shopping_lists: [{
                    date_created: "Sat, 18 Nov 2017 06:30:45 GMT",
                    date_modified: "Sat, 18 Nov 2017 06:30:45 GMT",
                    id: 26,
                    name: "party"
                },{
                    date_created: "Sat, 18 Nov 2017 06:30:45 GMT",
                    date_modified: "Sat, 18 Nov 2017 06:30:45 GMT",
                    id: 27,
                    name: "aaa"}
                ]})
            moxios.wait(function () {
                expect(wrapper.html()).toContain('party');
                done();
            })

        })

        it('it adds a shopping list', function (done) {
            const wrapper = mount(<Dashboard/>);
            wrapper.setState({name: "mate"})
            const back = wrapper.find('button#shopadd')
            back.simulate('click')
            TestUrl('shoppinglists/', 200, [{
                date_created: "Sat, 18 Nov 2017 06:30:45 GMT",
                date_modified: "Sat, 18 Nov 2017 06:30:45 GMT",
                id: 27,
                name: "party"
            }
            ])
            moxios.wait(function () {
                expect(wrapper.find("Toaster").html()).toContain('Shopping list has been added successfully');
                done();
            })
        })
        // it('it edits a shopping list', function (done) {
        //     const wrapper = mount(<Dashboard/>);
        //     wrapper.setState({name: "mate"})
        //     wrapper.setState({id: 4})
        //     wrapper.setState({showeditcomponent: true})
        //     const back = wrapper.find('button#shopedituu')
        //     back.simulate('click')
        //     moxios.stubRequest('https://shopping-list-api-muthomi.herokuapp.com/shoppinglists/4/', {
        //         status: 200,
        //         responseText: {
        //             message: {message:"Shoppinglist has been edited sucessfully"},
        //             shopping_lists: {
        //                 date_created: "Sat, 18 Nov 2017 06:30:45 GMT",
        //                 date_modified: "Sat, 18 Nov 2017 06:30:45 GMT",
        //                 id: 27,
        //                 name: "vacation"
        //             }
        //
        //         }
        //     })
        //     moxios.wait(function () {
        //         console.log(wrapper.html())
        //         expect(wrapper.html()).toContain('vacation');
        //         done();
        //     })
        // })

    })

})
