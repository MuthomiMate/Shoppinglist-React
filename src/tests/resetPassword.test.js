import React from 'react'
import PassReset from '../resetPassword'
import ReactDOM from 'react-dom'

it('pass reset renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PassReset/>, div);
});

