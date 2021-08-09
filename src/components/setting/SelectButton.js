import React, { Component } from 'react'
import { connect } from 'react-redux';
class SelectButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

    }

    onClick() {
        this.props.handeleClick()
    }

    render() {
        return (
            <div className="col-2">
                <div
                    className="btn btn-dark btn-sm w-100"
                    onClick={this.onClick}
                > Select</div>
            </div>
        )
    }
}

export default (SelectButton);