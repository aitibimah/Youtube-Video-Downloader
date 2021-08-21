import React, { Component } from "react";

export default class SaveButton extends Component {
  render() {
    return (
      <div className="col-sm-4 saveButton">
        <div
          onClick={this.props.handeleDownload}
          className="btn btn-sm btn-dark w-100"
        >
          Download
        </div>
      </div>
    );
  }
}
