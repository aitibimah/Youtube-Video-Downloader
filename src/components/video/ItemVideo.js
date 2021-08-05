import React, { Component } from 'react'

import Image from './Image';
import Details from './Details';
import CheckButton from './CheckButton';
import ProgressBar from './ProgressBar';

export default class ItemVideo extends Component {
    render() {
        return (
            <div>
                <Image/>
                <Details/>
                <CheckButton/>
                <ProgressBar/>
            </div>
        )
    }
}
