const { BrowserWindow, app, session, ipcMain, dialog } = require("electron");
const path = require("path");

const youtubedl = require("youtube-dl");
const fs = require("fs");

let win;

const isDev = !app.isPackaged;

function createWindow() {
  win = new BrowserWindow({
    width: 650,
    height: 670,
    resizable: false,
    backgroundColor: "white",
    backgroundThrottling: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: __dirname + "/preload.js",
    },
  });

  win.loadFile(`${__dirname}/src/index.html`);
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

// for linux
app.on("ready", async () => {
  session.defaultSession.loadExtension(
    "/home/mohamed/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_0",
    { allowFileAccess: true }
  );

  session.defaultSession.loadExtension(
    "/home/mohamed/.config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.2_0",
    { allowFileAccess: true }
  );
});

/*
app.on('ready', async () => {

    session.defaultSession.loadExtension(
        'C:/Users/Bimah/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_0/',
        { allowFileAccess: true }
    )

    session.defaultSession.loadExtension(
        'C:/Users/Bimah/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.2_0/',
        { allowFileAccess: true }
    )

})*/

app.whenReady().then(createWindow);

//-------------------------------------------------------------
//-------------------------------------------------------------

ipcMain.on("open-file-dialog", (event) => {
  console.log("TYPE : Open file dialog");

  dialog
    .showOpenDialog(win, {
      properties: ["openFile", "openDirectory"],
    })
    .then((result) => {
      event.returnValue = result.filePaths;
    })
    .catch((err) => {
      console.log(err);
    });
});

//-------------------------------------------------------------
//-------------------------------------------------------------

ipcMain.on("get-info-video", (event, url, option) => {
  console.log("TYPE : ", "get-info-video");

  youtubedl.getInfo(url, option, function (err, info) {
    if (err) {
      console.log("-----------err------------");
      console.log(err);
      throw err;
    }
    console.log(info);

    win.webContents.send("get-info-video-reply", info);
  });
});

//-------------------------------------------------------------
//-------------------------------------------------------------

ipcMain.on("download-video", (event, app) => {
  console.log("TYPE : ", "download-video", app.videos);
  const format_code = app.quality;
  const video = youtubedl(app.url, [`--format=${format_code}`, "--continue"], {
    cwd: app.saveDirrctory,
  });

  let downloaded = 0;
  let video_Progress = 0;

  let output =
    app.saveDirrctory +
    "/" +
    app.videos[0].title +
    " - " +
    app.videos[0].id +
    "." +
    app.format;

  let video_reply = {
    id: app.videos[0].id,
    title: app.videos[0].title,
    duration_hms: app.videos[0].duration_hms,
    thumbnail: app.videos[0].thumbnail,
    video_Progress: video_Progress,
    size: 0,
  };

  video.on("info", function (info) {
    console.log("Download started");
    video_reply.size = info.size;

    if (fs.existsSync(output) && fs.statSync(output).size == info.size) {
      console.log("already downloaded.");
      video.emit("end");
    } else {
      console.log("start downloading.");
      console.log("filename: " + info._filename);
    }
  });

  /////////////////////// on data ////////////////////
  video.on("data", function (data) {
    downloaded = downloaded + data.length;
    video_reply.video_Progress = downloaded / video_reply.size;
    video_reply.video_Progress = video_reply.video_Progress.toFixed(2);

    console.log(video_reply.video_Progress);

    win.webContents.send("asynchronous-video-reply", video_reply);
  });

  //////////////////// on error ////////////////////
  video.on("error", function error(err) {
    console.log("video error: ", err);
  });

  video.pipe(fs.createWriteStream(output, { flags: "a" }));

  ////////////////////// on end ////////////////////

  video.on("end", function () {
    console.log("video end--------");
  });
});

//-------------------------------------------------------------
//-------------------------------------------------------------
function playlist(app) {
  const format_code = app.quality;

  const list_video = app.videos;
  let indexs = "";

  list_video.map((video, index) => {
    if (index == list_video.length - 1) {
      indexs = indexs + video.playlist_index;
    } else {
      indexs = indexs + video.playlist_index + ",";
    }
  });

  console.log(indexs);

  const video = youtubedl(
    app.url,
    [
      `--format=${format_code}`,
      "--socket-timeout=1",
      `--playlist-items=${indexs}`,
    ],
    {
      cwd: app.saveDirrctory,
    }
  );

  video.on("error", function error(err) {
    console.log("error 2:", err);
  });

  let size = 0;
  video.on("info", function (info) {
    size = info.size;
    let output = path.join(app.saveDirrctory + "/", size + "." + app.format);
    video.pipe(fs.createWriteStream(output));
  });

  video.on("next", function () {
    console.log("on next ----------------");

    app.playlist(app);
  });
}

ipcMain.on("download-video-playlist", (event, app) => {
  console.log("TYPE : ", "download-video-playlist");
  const format_code = app.quality;
  app.videos.map((video, index) => {
    let output =
      app.saveDirrctory +
      "/" +
      video.title +
      " - " +
      video.id +
      "." +
      app.format;

    const vid_eo = youtubedl(
      app.url,

      // Optional arguments passed to youtube-dl.
      [`--format=${format_code}`, "--continue"],

      // start will be sent as a range header
      { cwd: app.saveDirrctory }
    );

    let downloaded = 0;
    let video_Progress = 0;
    let index_list = video.playlist_index;

    let video_reply = {
      id: video.id,
      title: video.title,
      duration_hms: video.duration_hms,
      thumbnail: video.thumbnail,
      video_Progress: video_Progress,
      size: 0,
    };
    vid_eo.on("info", function (info) {
      video_reply.size = info.size;
      if (fs.existsSync(output) && fs.statSync(output).size == info.size) {
        console.log("already downloaded.");
        video_reply.video_Progress = 1;
        win.webContents.send(
          "asynchronous-reply-list",
          video_reply,
          index_list
        );
        vid_eo.emit("end");
      } else {
        console.log("start downloading.");
        console.log("filename: " + info._filename);
      }
    });

    vid_eo.on("data", function (data) {
      downloaded = downloaded + data.length;
      video_reply.video_Progress = downloaded / video_reply.size;
      video_reply.video_Progress = video_reply.video_Progress.toFixed(2);

      win.webContents.send("asynchronous-reply-list", video_reply, index_list);
    });

    vid_eo.pipe(fs.createWriteStream(output, { flags: "a" }));

    vid_eo.on("end", function () {
      console.log("finished downloading!");
    });

    //////////////////// on error ////////////////////
    vid_eo.on("error", function error(err) {
      console.log("video error: ", err);
    });
  });
});
