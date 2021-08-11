import React, { Component } from 'react'

export default class SaveButton extends Component {




    render() {
        return (
            <div className="col-sm-4 saveButton">
                <div onClick={() => {
                    console.log('Hello hh Worlds :=====> ')
                    console.log(ipcRenderer.sendSync('save-all'))

                }} className="btn btn-sm btn-dark w-100">Save</div>
            </div>
        )
    }
}
