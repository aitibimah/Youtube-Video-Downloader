import React, { Component } from 'react'
import SearchButton from './search/SearchButton'
import SearchField from './search/SearchField'

export default class AreaSearch extends Component {


    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        console.log("handel click search btn")
    }



    handleChageSearchField(url) {
        this.props.setUrl(url)
    }


    setUrl

    render() {

        return (
            <div className="row areaSearch">
                <SearchField
                    handleChageSearchField={(url) => { this.handleChageSearchField(url) }}
                />
                <SearchButton
                    handleClick={this.handleClick}
                />
            </div>
        )
    }
}
