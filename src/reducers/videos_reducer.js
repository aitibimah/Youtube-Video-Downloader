import _ from 'lodash';
import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE,
  SET_VIDEOS_DIRECTORY
} from '../actions/types';


const initialState = {
  videos: [],
  saveDirrctory: "",
};

export default function (state = initialState, action) {

  switch (action.type) {
    case SET_VIDEOS_DIRECTORY:
      return {
        ...state,
        saveDirrctory: action.payload[0]
      };



    default:
      return state;
  }
}
