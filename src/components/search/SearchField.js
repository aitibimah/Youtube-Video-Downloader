import React, { Component } from 'react'

export default class SearchField extends Component {


    constructor() {
        super();
        this.onChange = this.onChange.bind(this);

    }



    onChange(e) {

        this.props.handleChageSearchField(e.target.value)
    }


    render() {
        return (
            <div className="col-sm-10">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Put you url here"
                    onChange={this.onChange}
                />

            </div>
        )
    }
}
