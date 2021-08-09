import React, { Component } from 'react'
import AreaSearch from './AreaSearch';
import VideoList from './VideoList';
import AreaSetting from './AreaSetting';
import './app.scss';

class Content extends Component {
    render() {
        return (
            <div className="app">
                <AreaSearch />
                <VideoList />
                <AreaSetting />
            </div>
        )
    }
}




export default (Content)