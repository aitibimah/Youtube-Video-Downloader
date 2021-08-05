import React, { Component } from 'react'
import store from '../reducers/index';
import { Provider } from 'react-redux';
import Content from './Content';


class App extends Component {

    render() {
    return (

        <Provider store={store}>
        <Content/>
        </Provider>
    )

}
}


export default App;
