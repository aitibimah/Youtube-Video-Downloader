import React, { Component } from 'react'
import AreaSearch from './AreaSearch';
import VideoList from './VideoList';

export default class Content extends Component {
    render() {
        return (
            <div>
            <AreaSearch/>
            <VideoList/>
            <button onClick={this.onClick}>clicMe</button>    
            </div>
        )
    }
}
