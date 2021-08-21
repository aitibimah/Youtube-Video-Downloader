import React, { Component } from "react";

export default class SearchButton extends Component {
  render() {
    return (
      <div className="col-sm-2">
        <div
          onClick={this.props.handleClick}
          className="btn btn-sm btn-dark w-100"
        >
          Search
        </div>
      </div>
    );
  }
}
