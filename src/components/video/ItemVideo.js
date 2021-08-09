import React, { Component } from 'react'

import Image from './Image';
import Details from './Details';
import CheckButton from './CheckButton';
import ProgressBar from './ProgressBar';

export default class ItemVideo extends Component {
    render() {
        return (
            <div className="col-sm-12 itemVideo">
                <div className="small-img-row">
                    <div className="small-img">
                        <Image image="../image/tokyo.jpg" />
                    </div>

                    <div className="detail-area">
                        <Details />
                        <CheckButton />
                        <ProgressBar />
                    </div>

                </div>



            </div>
        )
    }
}
