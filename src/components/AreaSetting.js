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
        this.handeleClick = this.handeleClick.bind(this);
        this.handeleChangeFormat = this.handeleChangeFormat.bind(this);
        this.handeleChangeQuality = this.handeleChangeQuality.bind(this);



    }


    handeleClick() {

        const dir = this.props.chooseDirectory()
        this.props.setDirrctory(dir[0])

    }


    handeleChangeFormat(format) {

        this.props.setFormat(format)
    }


    handeleChangeQuality(quality) {

        this.props.setQuality(quality)

    }

    render() {

        const { saveDirrctory } = this.props.app

        return (
            <div className="areaSetting">

                <div className="row">
                    <SelectDirectory saveDirrctory={saveDirrctory} />
                    <SelectButton handeleClick={this.handeleClick} />
                </div>
                <div className="row">
                    <ChoiceFormat handeleChangeFormat={(e) => { this.handeleChangeFormat(e) }} />
                    <ChoiceQuality handeleChangeQuality={(e) => { this.handeleChangeQuality(e) }} />
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