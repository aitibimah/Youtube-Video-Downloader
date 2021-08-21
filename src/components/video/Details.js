import React, { Component } from "react";

export default class Details extends Component {
  render() {
    const { title } = this.props;
    return <div className="title">{title}</div>;
  }
}
