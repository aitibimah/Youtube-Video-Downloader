import React, { Component } from "react";

export default class ChoiceQuality extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.handeleChangeQuality(e.target.value);
  }

  render() {
    const { availableQualities } = this.props;

    return (
      <div className="choiceQuality col-sm-4">
        <select
          onChange={(e) => {
            this.onChange(e);
          }}
          className="form-select form-select-sm"
        >
          <option>Choice Quality</option>
          {availableQualities.map((quality, index) => (
            <option key={index} value={quality.value}>
              {quality.format}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
