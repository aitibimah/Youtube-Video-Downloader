const { BrowserWindow, app, session } = require('electron');
const path = require('path');

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


  app.on('ready', async () => {
    
    session.defaultSession.loadExtension(
        '/home/mohamed/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_0', 
        { allowFileAccess: true }
        )

    session.defaultSession.loadExtension(
            '/home/mohamed/.config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.2_0', 
            { allowFileAccess: true }
            )
    
  })


app.whenReady().then(createWindow)