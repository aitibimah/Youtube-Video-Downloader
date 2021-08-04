

const { BrowserWindow, app } = require('electron');
const path = require('path');
const os = require('os')

const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(`${__dirname}/src/index.html`);
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

/* const reactDevToolsPath = 'C:\Users\Bimah\AppData\Local\Google\Chrome\User Data\Default\Extensions\fmkadmapgofadopljbjfkapdkoienihi\4.14.0_0'

console.log(reactDevToolsPath) */

//app.whenReady().then(createWindow)


/* app.whenReady().then(() => {
    createWindow();
    session.defaultSession.loadExtension(reactDevToolsPath)

}) */
