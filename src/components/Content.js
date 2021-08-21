import React, { Component } from "react";
import AreaSearch from "./AreaSearch";
import VideoList from "./VideoList";
import AreaSetting from "./AreaSetting";
import "./app.scss";

import {
  dispatchUrl,
  dispatchQuality,
  dispatchVideos,
  dispatchFormat,
  downloadVideo,
  downloadPlaylist,
  dispatchQualities,
} from "../actions/index";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Content extends Component {
  constructor() {
    super();
    this.setFormat = this.setFormat.bind(this);
    this.setQuality = this.setQuality.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
    this.download = this.download.bind(this);
  }

  download() {
    const { type } = this.props.app;
    const { app } = this.props;
    switch (type) {
      case "video":
        this.props.downloadVideo(app);
        break;

      case "playlist":
        this.props.downloadPlaylist(app);
        break;

      default:
        console.log("Hello hh Worlds :=====> default");
        break;
    }
  }

  search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        return false;
      }
    }

    return true;
  }

  handleCheckChieldElement(event) {
    let videos = this.props.app.videos;

    if (videos.length == 0) {
      let newVideo = {
        id: event.target.value,
        title: event.target.attributes.title.value,
        duration_hms: event.target.attributes.duration_hms.value,
        thumbnail: event.target.attributes.thumbnail.value,
        size: 0,
        video_Progress: 0,
        playlist_index: event.target.attributes.playlist_index.value,
      };
      videos.push(newVideo);
    } else {
      for (let i = 0; i < videos.length; i++) {
        if (
          videos[i].id == event.target.value &&
          event.target.checked == false
        ) {
          videos = videos.filter(function (el) {
            return el.id != event.target.value;
          });

          break;
        } else if (
          event.target.checked == true &&
          this.search(videos[i].id, videos) == false
        ) {
          let newVideo = {
            id: event.target.value,
            title: event.target.attributes.title.value,
            duration_hms: event.target.attributes.duration_hms.value,
            thumbnail: event.target.attributes.thumbnail.value,
            size: 0,
            video_Progress: 0,
            playlist_index: event.target.attributes.playlist_index.value,
          };
          videos.push(newVideo);

          break;
        }
      }
    }

    this.setVideos(videos);
  }

  setVideos(videos) {
    this.props.dispatchVideos(videos);
  }

  setUrl(url) {
    this.props.dispatchUrl(url);
  }

  setType(type) {
    this.props.dispatchType(type);
  }

  setFormat(format) {
    this.props.dispatchFormat(format);
    const availableQualities = this.props.app.availableFormat;

    this.props.dispatchQualities(availableQualities[format]);
  }

  setQuality(quality) {
    this.props.dispatchQuality(quality);
  }

  render() {
    return (
      <div className="app">
        <AreaSearch setUrl={this.setUrl} />
        <VideoList handleCheckChieldElement={this.handleCheckChieldElement} />
        <AreaSetting
          setFormat={this.setFormat}
          setQuality={this.setQuality}
          download={this.download}
        />
      </div>
    );
  }
}

Content.propTypes = {
  dispatchUrl: PropTypes.func.isRequired,
  dispatchVideos: PropTypes.func.isRequired,
  dispatchQuality: PropTypes.func.isRequired,
  downloadVideo: PropTypes.func.isRequired,
  dispatchFormat: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});

export default connect(mapStateToProps, {
  dispatchUrl,
  dispatchQuality,
  dispatchVideos,
  dispatchFormat,
  downloadVideo,
  dispatchQualities,
  downloadPlaylist,
})(Content);
