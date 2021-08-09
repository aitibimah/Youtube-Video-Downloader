import React, { Component } from 'react'
import store from '../store';
import { Provider } from 'react-redux';
import Content from './Content';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {

    render() {
        return (

            <Provider store={store}>
                <Content />
            </Provider>
        )

    }
}


export default (App);
