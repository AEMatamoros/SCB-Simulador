const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const grafica = require('./graficaController');
const graficaWindow = document.getElementById('btn-grafica');

graficaWindow.addEventListener('click', (event)=>{
    let dataWindow = new BrowserWindow({
        
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true
        }
    });
    //console.log('betatester');
    dataWindow.loadURL(url.format({
        pathname:path.join("../templates/grafica.html"),
        protocol:false,
        slashes:true
    }))
});


