import React, { Component } from 'react'

export default class ProgressBar extends Component {
    render() {
        return (

            <div className="progressBar">
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: '100%' }} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                </div>

            </div>

        )
    }
}
