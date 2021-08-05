import React, { Component } from 'react'
import SearchButton from './search/SearchButton'
import SearchField from './search/SearchField'

export default class AreaSearch extends Component {
    render() {
        return (
            <div>
            <SearchField/>
            <SearchButton/>
            </div>
        )
    }
}
