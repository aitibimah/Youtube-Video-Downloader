import React, { Component } from 'react'

export default class ChoiceQuality extends Component {


    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {

        this.props.handeleChangeQuality(e.target.value)
    }

    render() {

        const availableQualities = [
            { value: 'best', option: 'Best Qualitie' },
            { value: '720p', option: 'HD' },
            { value: '480p', option: 'SD' },
            { value: '360p', option: 'LOW SD' },
            { value: '240p', option: 'Quality 240p' },
            { value: '144p', option: 'Quality 144p' },

        ]


        return (

            <div className="choiceQuality col-sm-4" >
                <select
                    onChange={(e) => { this.onChange(e) }}
                    className="form-select form-select-sm"
                >
                    <option>Choice Quality</option>
                    {availableQualities.map((quality, index) => (
                        <option key={index} value={quality.value}>{quality.option}</option>
                    ))}
                </select>

            </div>
        )
    }
}
