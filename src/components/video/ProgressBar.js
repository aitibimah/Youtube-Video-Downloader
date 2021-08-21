import React, { Component } from "react";

export default class ProgressBar extends Component {
  render() {
    const { progress } = this.props;
    return (
      <div className="progressBar">
        <div className="progress itemProg">
          <div
            className="progress-bar progress-bar-animated color-white"
            role="progressbar"
            style={{ width: `${progress * 100}%` }}
            aria-valuenow={progress * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progress * 100 == 100 ? "Downloaded" : `${progress * 100}%`}
          </div>
        </div>
      </div>
    );
  }
}
