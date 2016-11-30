const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready', () => {
    let win = new BrowserWindow({width:1280, height:800})
    win.loadURL('file://' + __dirname + '/index.html')
})
