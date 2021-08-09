import React, { Component } from 'react'
import SelectDirectory from './setting/SelectDirectory'
import ChoiceFormat from './setting/ChoiceFormat'
import ChoiceQuality from './setting/ChoiceQuality'
import SaveButton from './setting/SaveButton'
import SelectButton from './setting/SelectButton'
import { chooseDirectory } from '../actions/index'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AreaSetting extends Component {

    constructor() {
        super();
        this.state = {
            directory: ''
        };
        this.handeleClick = this.handeleClick.bind(this);

    }

    handeleClick() {
        this.props.chooseDirectory()

        this.setState({ directory: this.props.app.videoDirectory });

        console.log(this.state)

    }

    render() {

        return (
            <div className="areaSetting">

                <div className="row">
                    <SelectDirectory />
                    <SelectButton handeleClick={this.handeleClick} />
                </div>
                <div className="row">
                    <ChoiceFormat />
                    <ChoiceQuality />
                    <SaveButton />
                </div>

            </div>

        )
    }
}



AreaSetting.propTypes = {
    chooseDirectory: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    app: state.app,
});

export default connect(
    mapStateToProps,
    { chooseDirectory }
)(AreaSetting);