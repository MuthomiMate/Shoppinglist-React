import React from 'react'
import Toaster from '../sucessToaster'
import ReactDOM from 'react-dom'

it('toaster renders without crashing', () => {
    const container = document.createElement('ToastContainer');
    ReactDOM.render(<Toaster/>, container);
});
