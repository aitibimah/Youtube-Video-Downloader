import React, { Component } from 'react'

export default class Image extends Component {
    render() {

        const {image} = this.props
        return (
            <div>
                <img src={image} />
            </div>
        )
    }
}
