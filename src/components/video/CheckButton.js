import React, { Component } from 'react'

export default class CheckButton extends Component {
    render() {
        return (
            <div className="custom-checkbox">

                <input
                    name="users[]"
                    type="checkbox"
                    className="custom-control-input"
                    id={`customCheck$`}
                    value={'val'}
                    onClick={console.log("cliked")}
                // checked={this.props.isChecked}

                />

                <label className="custom-control-label" htmlFor={`customCheck$`}
                ></label>
            </div>
        )
    }
}
