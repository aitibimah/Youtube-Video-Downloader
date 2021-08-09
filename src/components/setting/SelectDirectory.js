import React, { Component } from 'react'

export default class SelectDirectory extends Component {
    render() {
        return (
            <div className="col-sm-10">
                <input className="form-control form-control-sm" placeholder="Select Directory to save video" type="text" disabled />
            </div>
        )
    }
}
