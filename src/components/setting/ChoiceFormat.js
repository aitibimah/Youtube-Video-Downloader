import React, { Component } from 'react'

export default class ChoiceFormat extends Component {
    render() {
        return (
            <div className="choiceFormat col-sm-4">
                <select className="form-select form-select-sm">
                    <option>Choice Format</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </select>

            </div>
        )
    }
}
