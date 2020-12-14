const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const newDataWindowBtn= document.getElementById('btn-data');
const newDataWindowBtn2= document.getElementById('btn-learn');

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

newDataWindowBtn2.addEventListener('click', (event)=>{
    let dataWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true
        },
        width:'900px',
        height:'900px'
    });

    //dataWindow.webContents.openDevTools();
    dataWindow.removeMenu();
    dataWindow.loadURL(url.format({
        pathname:path.join("../templates/learn.html"),
        protocol:false,
        slashes:true
    }))
})
