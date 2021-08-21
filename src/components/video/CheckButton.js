import React, { Component } from "react";

export default class CheckButton extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log("is clecked");
  }
  render() {
    const { vidId } = this.props;
    const { title } = this.props;

    const { duration_hms } = this.props;
    const { thumbnail } = this.props;

    const { playlist_index } = this.props;

    return (
      <div className="custom-checkbox">
        <input
          name="videos[]"
          type="checkbox"
          className="custom-control-input"
          id={`customCheck${vidId}`}
          value={vidId}
          title={title}
          duration_hms={duration_hms}
          thumbnail={thumbnail}
          playlist_index={
            typeof playlist_index == "undefined" ? "non" : playlist_index
          }
          onClick={(id) => {
            this.props.handeleCheckButtonClick(id);
          }}
        />

        <label
          className="custom-control-label"
          htmlFor={`customCheck$`}
        ></label>
      </div>
    );
  }
}
