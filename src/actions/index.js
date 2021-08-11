import { SET_VIDEOS_DIRECTORY } from "./types";

export const chooseDirectory = () => dispatch => {
    const path = ipcRenderer.sendSync('open-file-dialog');

    dispatch({
        type: SET_VIDEOS_DIRECTORY,
        payload: path
    });

    return path;

};




export const prinMessage = () => {

    console.log('Hello hh Worlds :=====> ')
    console.log(ipcRenderer.sendSync('save-all'))




};
