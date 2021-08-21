import React, { Component } from 'react'
import SearchButton from './search/SearchButton'
import SearchField from './search/SearchField'
import {getInfoVideo} from '../actions/index'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AreaSearch extends Component {


    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {

        const {url}= this.props.app
        this.props.getInfoVideo(url,[])

    }



    handleChageSearchField(url) {
        this.props.setUrl(url)
    }


    

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




AreaSearch.propTypes = {
    getInfoVideo: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    app: state.app,
});

export default connect(
    mapStateToProps,
    { getInfoVideo }
)(AreaSearch);