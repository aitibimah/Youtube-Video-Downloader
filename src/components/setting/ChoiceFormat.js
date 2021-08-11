import React, { Component } from 'react'

export default class ChoiceFormat extends Component {



    constructor() {
        super();
        this.onChange = this.onChange.bind(this);

    }


    onChange(e) {

        this.props.handeleChangeFormat(e.target.value)
    }



    render() {


        const availableFormats = [
            { value: 'mp4', option: 'MP4' },
            { value: 'webm', option: 'WEBM' },
        ]


        return (
            <div className="choiceFormat col-sm-4">
                <select
                    onChange={(e) => { this.onChange(e) }}
                    className="form-select form-select-sm"
                >
                    <option>Choice Format</option>

                    {availableFormats.map((format, index) => (
                        <option key={index} value={format.value}>{format.option}</option>
                    ))}

                </select>

            </div>
        )
    }
}
