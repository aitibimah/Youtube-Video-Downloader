import React, { Component } from 'react'
import AreaSearch from './AreaSearch';
import VideoList from './VideoList';
import AreaSetting from './AreaSetting';
import './app.scss';

class Content extends Component {


    constructor() {
        super();
        this.state = {
            url: '',
            type: '',
            videoList: [],
            format: '',
            quality: '',
            saveDirrctory: ''
        };

        this.setDirrctory = this.setDirrctory.bind(this)
        this.setFormat = this.setFormat.bind(this)
        this.setQuality = this.setQuality.bind(this)
        this.setUrl = this.setUrl.bind(this)



    }


    setUrl(url) {

        this.setState({ url: url });
    }

    setType(type) {

        this.setState({ type: type });
    }



    setVideoList(video) {

        this.setState({ videoList: video });
    }



    setFormat(format) {

        this.setState({ format: format });
    }



    setQuality(quality) {

        this.setState({ quality: quality });
    }


    setDirrctory(dirrctory) {
        this.setState({ saveDirrctory: dirrctory });

    }


    render() {

        return (
            <div className="app">
                <AreaSearch
                    setUrl={this.setUrl}
                />
                <VideoList />
                <AreaSetting
                    setFormat={this.setFormat}
                    setDirrctory={this.setDirrctory}
                    setQuality={this.setQuality}
                />
            </div>
        )
    }
}




export default (Content)