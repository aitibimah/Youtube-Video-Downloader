import _ from "lodash";
import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE,
  SET_VIDEOS_DIRECTORY,
  SET_VIDEO_URL,
  SET_VIDEO_TYPE,
  SET_VIDEO_FORMAT,
  SET_VIDEO_QUALITY,
  SET_VIDEOS,
  SET_FETCHED_VIDEOS,
  START_DOWNLOAD,
  SET_AVAILABLE_VIDEO_FORMAT,
  SET_AVAILABLE_VIDEO_QUALITY,
} from "../actions/types";

const initialState = {
  videos: [],
  fetchesVideosList: [],
  availableFormat: [],
  availablequality: [],
  saveDirrctory: "",
  url: "",
  type: "video",
  format: "",
  quality: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_VIDEOS_DIRECTORY:
      return {
        ...state,
        saveDirrctory: action.payload[0],
      };

    case SET_VIDEO_URL:
      return {
        ...state,
        url: action.payload,
      };

    case SET_VIDEO_TYPE:
      return {
        ...state,
        type: action.payload,
      };

    case SET_VIDEO_FORMAT:
      return {
        ...state,
        format: action.payload,
      };

    case SET_VIDEO_QUALITY:
      return {
        ...state,
        quality: action.payload,
      };

    case SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };

    case SET_FETCHED_VIDEOS:
      return {
        ...state,
        fetchesVideosList: action.payload,
      };

    case VIDEO_PROGRESS:
      return {
        ...state,
        fetchesVideosList: state.fetchesVideosList.map((video) =>
          video.id === action.payload.id
            ? // transform the one with a matching id
              {
                ...video,
                video_Progress: action.payload.video_Progress,
                size: action.payload.size,
              }
            : // otherwise return original
              video
        ),
      };

    case START_DOWNLOAD:
      return {
        ...state,
        fetchesVideosList: state.videos,
      };

    case SET_AVAILABLE_VIDEO_FORMAT:
      return {
        ...state,
        availableFormat: action.payload,
      };

    case SET_AVAILABLE_VIDEO_QUALITY:
      return {
        ...state,
        availablequality: action.payload,
      };

    // hena 5asse nzed grouped forma despacher

    default:
      return state;
  }
}
