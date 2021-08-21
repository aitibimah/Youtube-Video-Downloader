import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import ItemVideo from "./video/ItemVideo";

class VideoList extends Component {
  constructor() {
    super();

    this.handeleClick = this.handeleClick.bind(this);
  }

  handeleClick(e) {
    this.props.handleCheckChieldElement(e);
  }

  render() {
    const { fetchesVideosList } = this.props.app;
    return (
      <div className="row videoList">
        {/* <div className="lds-ripple">
        <div></div>
        <div></div>
      </div> */}
        {_.map(fetchesVideosList, (video) => (
          <ItemVideo
            key={video.id}
            video={video}
            handeleClick={this.handeleClick}
          />
        ))}
      </div>
    );
  }
}

VideoList.propTypes = {
  app: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});

export default connect(mapStateToProps, {})(VideoList);
