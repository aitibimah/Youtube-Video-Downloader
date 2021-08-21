import {
  SET_FETCHED_VIDEOS,
  SET_VIDEOS,
  SET_VIDEOS_DIRECTORY,
  SET_VIDEO_QUALITY,
  SET_VIDEO_TYPE,
  SET_VIDEO_URL,
  SET_VIDEO_FORMAT,
  VIDEO_PROGRESS,
  START_DOWNLOAD,
  SET_AVAILABLE_VIDEO_FORMAT,
  SET_AVAILABLE_VIDEO_QUALITY,
} from "./types";

export const chooseDirectory = () => (dispatch) => {
  const path = ipcRenderer.sendSync("open-file-dialog");

  dispatch({
    type: SET_VIDEOS_DIRECTORY,
    payload: path,
  });

  return path;
};

export const dispatchUrl = (url) => (dispatch) => {
  dispatch({
    type: SET_VIDEO_URL,
    payload: url,
  });
};

export const dispatchFormat = (format) => (dispatch) => {
  dispatch({
    type: SET_VIDEO_FORMAT,
    payload: format,
  });
};

export const dispatchType = (type) => (dispatch) => {
  dispatch({
    type: SET_VIDEO_TYPE,
    payload: type,
  });
};

export const dispatchQuality = (quality) => (dispatch) => {
  dispatch({
    type: SET_VIDEO_QUALITY,
    payload: quality,
  });
};

export const dispatchQualities = (qualities) => (dispatch) => {
  dispatch({
    type: SET_AVAILABLE_VIDEO_QUALITY,
    payload: qualities,
  });
};

export const dispatchVideos = (videos) => (dispatch) => {
  dispatch({
    type: SET_VIDEOS,
    payload: videos,
  });
};

function toSupportedFormat(url) {
  if (url.includes("list=")) {
    var playlistId = url.substring(url.indexOf("list=") + 5);
    return "https://www.youtube.com/playlist?list=" + playlistId;
  }

  return url;
}

export const getInfoVideo = (url, option) => {
  let video;
  let videoList = [];
  url = toSupportedFormat(url);

  return function (dispatch) {
    ipcRenderer.send("get-info-video", url, option);
    ipcRenderer.on("get-info-video-reply", (event, info) => {
      let formats;

      if (url.includes("list=")) {
        formats = info[0].formats;
      } else {
        formats = info.formats;
      }

      const availableFormats = {
        "3gp": [],
        aac: [],
        flv: [],
        m4a: [],
        mp3: [],
        mp4: [],
        ogg: [],
        wav: [],
        webm: [],
      };

      formats.map((format) => {
        Object.keys(availableFormats).map(function (key, index) {
          if (format.ext == key) {
            availableFormats[key].push({
              value: format.format_id,
              format_note: format.format_note,
              ext: format.ext,
              format: format.format,
              width: format.width,
              height: format.height,
            });
          }
        });
      });

      dispatch({
        type: SET_AVAILABLE_VIDEO_FORMAT,
        payload: availableFormats,
      });

      if (url.includes("list=")) {
        dispatch({
          type: SET_VIDEO_TYPE,
          payload: "playlist",
        });
      } else {
        dispatch({
          type: SET_VIDEO_TYPE,
          payload: "video",
        });
      }

      if (Array.isArray(info)) {
        info.forEach(function (item) {
          video = {
            id: item.id,
            title: item.title,
            duration_hms: item._duration_hms,
            thumbnail: item.thumbnail,
            video_Progress: 0,
            size: 0,
            playlist_index: item.playlist_index,
          };

          videoList.push(video);
        });
      } else {
        video = {
          id: info.id,
          title: info.title,
          duration_hms: info._duration_hms,
          thumbnail: info.thumbnail,
          video_Progress: 0,
          size: 0,
        };

        videoList.push(video);
      }

      dispatch({
        type: SET_FETCHED_VIDEOS,
        payload: videoList,
      });
    });
  };
};

export const prinMessage = () => {};

export const downloadVideo = (app) => (dispatch) => {
  ipcRenderer.send("download-video", app);

  dispatch({
    type: START_DOWNLOAD,
    payload: "START_DOWNLOAD",
  });

  ipcRenderer.on("asynchronous-video-reply", (event, video_reply) => {
    dispatch({
      type: VIDEO_PROGRESS,
      payload: {
        id: video_reply.id,
        title: video_reply.title,
        duration_hms: video_reply.duration_hms,
        thumbnail: video_reply.thumbnail,
        video_Progress: video_reply.video_Progress,
        size: video_reply.size,
      },
    });
  });
};

export const downloadPlaylist = (app) => (dispatch) => {
  console.log("Hello hh Worlds :=====> downloadPlaylist ");
  ipcRenderer.send("download-video-playlist", app);

  dispatch({
    type: START_DOWNLOAD,
    payload: "START_DOWNLOAD",
  });

  ipcRenderer.on(
    "asynchronous-reply-list",
    (event, video_reply, index_list) => {
      dispatch({
        type: VIDEO_PROGRESS,
        payload: {
          id: video_reply.id,
          title: video_reply.title,
          duration_hms: video_reply.duration_hms,
          thumbnail: video_reply.thumbnail,
          video_Progress: video_reply.video_Progress,
          size: video_reply.size,
        },
      });
    }
  );
};
