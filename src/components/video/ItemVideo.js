import React, { Component } from "react";

import Image from "./Image";
import Details from "./Details";
import CheckButton from "./CheckButton";
import ProgressBar from "./ProgressBar";

export default class ItemVideo extends Component {
  constructor() {
    super();

    this.handeleCheckButtonClick = this.handeleCheckButtonClick.bind(this);
  }

  handeleCheckButtonClick(e) {
    this.props.handeleClick(e);
  }
  render() {
    const { video } = this.props;

    return (
      <div className="col-sm-12 itemVideo">
        <div className="small-img-row">
          <div className="small-img">
            <Image image={video.thumbnail} />
            <span className="duration_hms">{video.duration_hms}</span>
          </div>

          <div className="detail-area">
            <Details
              title={
                video.title.length > 100
                  ? video.title.substring(0, 95) + " ..."
                  : video.title
              }
            />
            <CheckButton
              handeleCheckButtonClick={this.handeleCheckButtonClick}
              vidId={video.id}
              title={video.title}
              duration_hms={video.duration_hms}
              thumbnail={video.thumbnail}
              playlist_index={video.playlist_index}
            />
            <ProgressBar progress={video.video_Progress} />
          </div>
        </div>
      </div>
    );
  }
}
