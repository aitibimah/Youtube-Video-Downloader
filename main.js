const { BrowserWindow, app, session, ipcMain, dialog } = require('electron');
const path = require('path');

let win;

const isDev = !app.isPackaged;

function createWindow() {
    win = new BrowserWindow({
        width: 650,
        height: 700,
        resizable: false,
        backgroundColor: "white",
        backgroundThrottling: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: __dirname + '/preload.js'
        }
    })

    win.loadFile(`${__dirname}/src/index.html`);

}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}



// for linux
/* app.on('ready', async () => {

    session.defaultSession.loadExtension(
        '/home/mohamed/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_0',
        { allowFileAccess: true }
    )

    session.defaultSession.loadExtension(
        '/home/mohamed/.config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.2_0',
        { allowFileAccess: true }
    )

}) */



app.on('ready', async () => {

    session.defaultSession.loadExtension(
        'C:/Users/Bimah/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_0/',
        { allowFileAccess: true }
    )

    session.defaultSession.loadExtension(
        'C:/Users/Bimah/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.2_0/',
        { allowFileAccess: true }
    )

})


app.whenReady().then(createWindow)


ipcMain.on('open-file-dialog', (event) => {
    console.log('receive open file dialog')

    dialog.showOpenDialog(win, {
        properties: ['openFile', 'openDirectory']
    }).then(result => {
        console.log('here is :', result.filePaths)
        win.webContents.send('selected-directory', result.filePaths);
    }).catch(err => {
        console.log(err)
    })


})

