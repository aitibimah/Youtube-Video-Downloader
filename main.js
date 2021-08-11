const { BrowserWindow, app, session, ipcMain, dialog } = require('electron');
const path = require('path');

const youtubedl = require('youtube-dl-exec')

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

        event.returnValue = result.filePaths

    }).catch(err => {
        console.log(err)
    })

})




ipcMain.on('save-all', (event) => {


    console.log('*********ytdl**************')




    youtubedl(
        'https://www.youtube.com/watch?v=axRAL0BXNvw',
        {

            dumpSingleJson: true

        }).then(
            output => {
                event.returnValue = output
                console.log(output)
            }
        ).catch(err => {
            console.log(err)
        })


    //subprocess.stdout.pipe(fs.createWriteStream('stdout.json'))
    //subprocess.stderr.pipe(fs.createWriteStream('stderr.json'))

    //setTimeout(subprocess.cancel, 30000)


    /* youtubedl(url, options, function (err, info) {
        if (err) {
            console.log('*********eroooor**************')
            throw err
        }
        console.log('*********************************************************************')
        console.log('id:', info.id)
        console.log('title:', info.title)
        console.log('url:', info.url)
        console.log('thumbnail:', info.thumbnail)
        console.log('description:', info.description)
        console.log('filename:', info._filename)
        console.log('format id:', info.format_id)
        console.log('********************************************************************')
    })
 */



})





