import React, { Component } from "react";
import SelectDirectory from "./setting/SelectDirectory";
import ChoiceFormat from "./setting/ChoiceFormat";
import ChoiceQuality from "./setting/ChoiceQuality";
import SaveButton from "./setting/SaveButton";
import SelectButton from "./setting/SelectButton";
import { chooseDirectory } from "../actions/index";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AreaSetting extends Component {
  constructor() {
    super();
    this.handeleClick = this.handeleClick.bind(this);
    this.handeleChangeFormat = this.handeleChangeFormat.bind(this);
    this.handeleChangeQuality = this.handeleChangeQuality.bind(this);
    this.handeleDownload = this.handeleDownload.bind(this);
  }

  handeleClick() {
    this.props.chooseDirectory();
  }

  handeleChangeFormat(format) {
    this.props.setFormat(format);
  }

  handeleChangeQuality(quality) {
    this.props.setQuality(quality);
  }

  handeleDownload() {
    this.props.download();
  }

  render() {
    const { saveDirrctory } = this.props.app;
    const { availableFormat } = this.props.app;
    const { availablequality } = this.props.app;

    return (
      <div className="areaSetting">
        <div className="row">
          <SelectDirectory saveDirrctory={saveDirrctory} />
          <SelectButton handeleClick={this.handeleClick} />
        </div>
        <div className="row">
          <ChoiceFormat
            availableFormat={availableFormat}
            handeleChangeFormat={(e) => {
              this.handeleChangeFormat(e);
            }}
          />
          <ChoiceQuality
            availableQualities={availablequality}
            handeleChangeQuality={(e) => {
              this.handeleChangeQuality(e);
            }}
          />
          <SaveButton handeleDownload={this.handeleDownload} />
        </div>
      </div>
    );
  }
}

AreaSetting.propTypes = {
  chooseDirectory: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});

export default connect(mapStateToProps, { chooseDirectory })(AreaSetting);
