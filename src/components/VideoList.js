import React, { Component } from 'react'

import ItemVideo from './video/ItemVideo'

export default class VideoList extends Component {
    render() {
        return (
            <div>
                <ItemVideo/>
                <ItemVideo/>
            </div>
        )
    }
}
