const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const {ipcMain} = require('electron')
//DB
require('./database')
//Model
const processData =require('./models/processData')

let mainWindow;

function MainWindow(){
    
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true
        },
        
        
    })

    mainWindow.removeMenu();
    //mainWindow.webContents.openDevTools();
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,"templates/index.html"),
        protocol:false,
        slashes:true
    }));

    mainWindow.on("closed",()=>{
        mainWindow=null
    })
}

ipcMain.on('postData',async (event,args)=>{
    const procesdata= new processData(args);
    result = await procesdata.save()
    event.reply('postDataOk',JSON.stringify(result));      
})

ipcMain.on('getData',async (event,args)=>{
    result = await processData.find()
    event.reply('getDataOk',JSON.stringify(result));  
})























app.on("ready",MainWindow);
app.allowRendererProcessReuse=true
