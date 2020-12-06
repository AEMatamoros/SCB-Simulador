const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const newDataWindowBtn= document.getElementById('btn-data');

newDataWindowBtn.addEventListener('click', (event)=>{
    let dataWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true
        }
    });

    //dataWindow.webContents.openDevTools();
    dataWindow.removeMenu();
    dataWindow.loadURL(url.format({
        pathname:path.join("../templates/data.html"),
        protocol:false,
        slashes:true
    }))
})

