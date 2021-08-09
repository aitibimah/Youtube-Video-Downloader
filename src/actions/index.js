import { SET_VIDEOS_DIRECTORY } from "./types";

export const chooseDirectory = () => async dispatch => {

    console.log('from fun')
    ipcRenderer.send('open-file-dialog');
    ipcRenderer.on('selected-directory', (event, path) => {

        dispatch({
            type: SET_VIDEOS_DIRECTORY,
            payload: path
        });

    })


};




export const prinMessage = () => {

    console.log('Hello Worlds')

};
