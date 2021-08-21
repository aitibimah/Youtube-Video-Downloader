import React, { Component } from "react";

export default class ChoiceFormat extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.handeleChangeFormat(e.target.value);
  }

  render() {
    const { availableFormat } = this.props;

    return (
      <div className="choiceFormat col-sm-4">
        <select
          onChange={(e) => {
            this.onChange(e);

            // hena hhhhhhhhhhhhhhhhhh
            //this.props.dispatchAvailableGropedFormat(availableFormats);
          }}
          className="form-select form-select-sm"
        >
          <option>Choice Format</option>

          {Object.keys(availableFormat).map((key, index) => {
            if (availableFormat[key] != 0) {
              return (
                <option key={index} value={key}>
                  {key.toUpperCase()}
                </option>
              );
            }
          })}
        </select>
      </div>
    );
  }
}
