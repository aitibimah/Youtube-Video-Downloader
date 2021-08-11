import React, { Component } from 'react'

export default class SelectDirectory extends Component {
    render() {
        const { saveDirrctory } = this.props;

        const placeholder = 'Select Directory to save video';
        return (
            <div className="col-sm-10">
                <input value={saveDirrctory != '' ? saveDirrctory : placeholder} className="form-control form-control-sm" type="text" disabled />
            </div>
        )
    }
}
