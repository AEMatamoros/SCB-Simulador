const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const informacionWindow = document.getElementById('btn-info');

informacionWindow.addEventListener('click', (event)=>{
    let dataWindow = new BrowserWindow({
        
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true
        }
    });
    //console.log('betatester');
    dataWindow.loadURL(url.format({
        pathname:path.join("../templates/informacion.html"),
        protocol:false,
        slashes:true
    }))
});


